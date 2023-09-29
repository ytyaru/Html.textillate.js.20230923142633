(function () { // window.TextBlock, get(sync/async string/URL):Generator, gets(sync/async string/URL):Array<string>
    class Lexer {
        #lines = null
        #blocks = []
        #ranges = []
        #i = 0
        #idx = 0
        async #loadAsync(url) { const res = await fetch(url); return await res.text(); }
        async #getTextAsync(source) {
            if (Type.isString(source)) { return source }
            else if (source instanceof URL) { return await this.#loadAsync(url) }
            else { throw new Error('引数sourceは文字列またはURL型であるべきです。') }
        }
        #init(text) {
            this.#i = 0
            this.#idx = 0
            this.#blocks.splice(0)
            this.#ranges.splice(0)
            text = text.replace(/(\r?\n){3,}/usg, '\n\n'); // 3つ以上連続した改行コードは2つにする
            this.#lines = text.trim().split(/\r?\n/)
        }
        //#load(url, fn) { return fetch(url).then((res)=>res.text()).then((text)=>fn(text)) }
        //#load(url, fn) { return fetch(url).then((res)=>res.text()).then((text)=>fn(text)) }
        #load(url, fn) { return fetch(url).then((res)=>res.text()) }
        #getText(source) {
            //if (Type.isString(source)) { return source }
            if (Type.isString(source)) { return new Promise((resolutionFn, rejectionFn)=>resolutionFn(source)) }
            else if (source instanceof URL) { return this.#load(url) }
            else { return new Promise((resolutionFn, rejectionFn)=>rejectionFn('引数sourceは文字列またはURL型であるべきです。'))}
            //else { throw new Error('引数sourceは文字列またはURL型であるべきです。') }
        }

        /*
        #getTextPromise(source) {
            return new Promise((resolutionFn, rejectionFn)=>{
                if (Type.isString(source)) { return resolutionFn(source) }
                else if (source instanceof URL) { return resolutionFn(this.#load(source)) }
                else { rejectionFn('引数sourceは文字列またはURL型であるべきです。') }
                //else { rejectionFn(new Error('引数sourceは文字列またはURL型であるべきです。')) }

                
            )}
        }
        */
        get(source, withIndex=false) {
            this.#getText(source).then((text)=>{
                this.#init(text)
                console.debug(text, this.#lines, this.#lines[0].length)
                if (1===this.#lines.length && 0===this.#lines[0].length) { return null }

                let [start, end] = [0, 0]
                console.log(this.#lines.length, this.#ranges)
                for (var i=0; i<this.#lines.length; i++) {
                    start = i
                    const isBreakBlock = !this.#lines[i]
                    end = this.#getBlockRangeEnd(start, isBreakBlock)
                    const isPush = ((isBreakBlock) ? ((0 < end-start) ? true : false) : true)
                    console.log(i, this.#ranges)
                    if (isPush) {
                        const block = this.#parse(this.#lines.slice(start, end+1).join('\n'))
                        yield (withIndex) ? [block, this.#idx] : block
                        this.#idx += 1
                    }
                    console.log(isBreakBlock, isPush, start, end, this.#ranges)
                    i = end
                }
            })
        }
        async *getAsync(source, withIndex=false) {
        //async *genAsync(source, withIndex=false) {
        //async *fromUrlGenAsync(url, withIndex=false) {
            //const text = (source instanceof URL) ? (await this.#loadAsync(url)) : source
            //const text = await this.#loadAsync(url)
            //const text = await this.#getTextAsync(source)
            const text = await this.#getTextAsync(source)
            this.#init(text)
            console.debug(text, this.#lines, this.#lines[0].length)
            if (1===this.#lines.length && 0===this.#lines[0].length) { return null }

            let [start, end] = [0, 0]
            console.log(this.#lines.length, this.#ranges)
            for (var i=0; i<this.#lines.length; i++) {
                start = i
                const isBreakBlock = !this.#lines[i]
                end = this.#getBlockRangeEnd(start, isBreakBlock)
                const isPush = ((isBreakBlock) ? ((0 < end-start) ? true : false) : true)
                console.log(i, this.#ranges)
                if (isPush) {
                    const block = this.#parse(this.#lines.slice(start, end+1).join('\n'))
                    yield (withIndex) ? [block, this.#idx] : block
                    this.#idx += 1
                }
                //if (isPush) { yield this.#parse(this.#lines.slice(start, end+1).join('\n')) }

                //if (isPush) { yield await this.#parse(this.#lines.slice(start, end+1).join('\n')) }
                console.log(isBreakBlock, isPush, start, end, this.#ranges)
                i = end
            }
        }
        async fromUrl(url) {
            const res = await fetch(url)
            const text = await res.text()
            console.log(text)
            return this.fromString(text)
        }
        fromString(str) {
            this.#i = 0
            this.#blocks.splice(0)
            this.#ranges.splice(0)
            //str = str.replace(/(\r?\n){3,}/us, '\n\n'); // 3つ以上連続した改行コードは2つにする
            str = str.replace(/(\r?\n){3,}/usg, '\n\n'); // 3つ以上連続した改行コードは2つにする
            this.#lines = str.trim().split(/\r?\n/)
            console.debug(str, this.#lines, this.#lines[0].length)
            if (1===this.#lines.length && 0===this.#lines[0].length) { return this }
            this.#getTextBlockRanges()
            return this
        }
        #getTextBlockRanges() {
            let [start, end] = [0, 0]
            console.log(this.#lines.length, this.#ranges)
            for (var i=0; i<this.#lines.length; i++) {
                start = i
                const isBreakBlock = !this.#lines[i]
                end = this.#getBlockRangeEnd(start, isBreakBlock)
                const isPush = ((isBreakBlock) ? ((0 < end-start) ? true : false) : true)
                console.log(i, this.#ranges)
                if (isPush) { this.#ranges.push([start, end]) }
                console.log(isBreakBlock, isPush, start, end, this.#ranges)
                i = end
            }
            console.debug(this.#lines.length, this.#ranges)
        }
        #getBlockRangeEnd(start, isBreak=false) {
            for (var i=start; i<this.#lines.length; i++) {
                if (isBreak) { if (this.#lines[i]) { return i-1 } } // BreakBlockRangeEnd
                else { if (!this.#lines[i]) { return i-1 } }        // TextBlockRangeEnd
            }
            return i
        }
        #parse(str) {
            // 一行すべて改行エスケープなら内容を１つ分削除する（台本と出力の行数を一致させるため）
            const lines = str.split(/\r?\n/)
            console.log(str, lines)
            for (let i=0; i<lines.length; i++) {
                if (lines[i].match(/^(\\n)+$/)) {
                    lines[i]= lines[i].slice(0, -2); 
                }
            }
            return lines.join('\n').replace(/\\n/g, '\n')
        }


        #load(url, fn) { fetch(url).then((res)=>res.text()).then((text)=>fn(text)) }
        gen(url, withIndex=false) {
            this.#load(url, this.#gen)
        }







        gets() { return this.#ranges.map((r)=>this.#parse(this.#lines.slice(r[0], r[1]+1).join('\n'))) }
        get(i) { return this.#parse(this.#lines.slice(this.#ranges[i][0], this.#ranges[i][1]+1).join('\n')) }
        now() { return this.#parse(this.#lines.slice(this.#ranges[this.#i][0], this.#ranges[this.#i][1]+1).join('\n')) }
        next() {
            const s = this.now()
            if (-1 < this.#i+1 && this.#i+1 < this.#ranges.length) { this.#i += 1; return s; }
            else { return null }
        }
        //next() { const s = this.now(); this.#i += 1; return (this.#isRange()) ? s : null; }
        //next() { const s = this.now(); this.#i += 1; return s; }
        //#isRange { return (this.#i < 0 || this.#ranges.length <= this.#i) }
        //#isRange { return (-1 < this.#i && this.#i < this.#ranges.length) }
        prev() { const s = this.now(); this.#i -= 1; return s; }
        first() { this.seek(0); }
        last() { this.seek(this.#ranges.length-1); }
        seek(i) { if (-1 < i && i < this.#ranges) { this.#i = i; return this.now(); } }

        get Ranges() { return this.#ranges }
        get I() { return this.#i }
    }
    window.TextBlock = window.TextBlock || new Lexer()
})();

