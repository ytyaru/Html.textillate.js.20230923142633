(function () { // window.TextBlock
    class Lexer {
        #lines = null
        #blocks = []
        #ranges = []
        #i = 0
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
                    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:',str);
                    lines[i]= lines[i].slice(0, -2); 
                }
//                lines[i] = unescape(escape(lines[i]))
            }
//            str.replace(/^(\\n)$/g, '') // 複数の\\nがあるときに対応できない

            return lines.join('\n').replace(/\\n/g, '\n')
            //return lines.join('\n')
            //return unescape(escape(lines.join('\n')))
            //return lines.join('\n').replace(/([^\\])(\\n)/g, '\n')
            //return lines.join('\n').replace(/[^\\]\\n/g, '\n')
            //return lines.join('\n').replace(/(?! \\\\n)/g, '\n')
//            return lines.join('\n').replace(/([^\\]\\n)/g, '\n')
        }
//        #parse(str) { return str.replace(/\\n/g, '\n') }
        //gets() { return this.#ranges.map((r)=>this.#lines.slice(r[0], r[1]+1).join('\n')) }
        //gets() { return this.#ranges.map((r)=>this.#lines.slice(r[0], r[1]+1).join('\n')) }
        gets() { return this.#ranges.map((r)=>this.#parse(this.#lines.slice(r[0], r[1]+1).join('\n'))) }
        get(i) { return this.#parse(this.#lines.slice(this.#ranges[i][0], this.#ranges[i][1]+1).join('\n')) }
        now() { return this.#parse(this.#lines.slice(this.#ranges[this.i][0], this.#ranges[this.i][1]+1).join('\n')) }
        next() { const s = this.now(); this.i += 1; return s; }
        prev() { const s = this.now(); this.i -= 1; return s; }
        first() { this.seek(0); }
        last() { this.seek(this.#ranges.length-1); }
        seek(i) { if (-1 < i && i < this.#ranges) { this.i = i; return this.now(); } }

        get Ranges() { return this.#ranges }
    }
    window.TextBlock = window.TextBlock || new Lexer()
})();

