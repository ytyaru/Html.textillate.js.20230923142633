(function () { // window.TextBlock
    class Lexer {
        #lines = null
        #blocks = []
        #ranges = []
        #i = 0
        #html = []
        async fromUrl(url) {
            const res = await fetch(url)
            const text = await res.text()
            return this.fromString(text)
        }
        fromString(str) {
            this.#i = 0
            this.#blocks.splice(0)
            this.#lines = str.trim().split(/\r?\n/)
            console.debug(this.#lines, this.#lines[0].length)
            if (1===this.#lines.length && 0===this.#lines[0].length) { return this }
            this.#getTextBlockRanges()
            return this
        }
        #getTextBlockRanges() {
            let [start, end] = [0, 0]
            for (var i=0; i<this.#lines.length; i++) {
                start = i
                const isBreakBlock = !this.#lines[i]
                end = this.#getBlockRangeEnd(start, isBreakBlock)
                const isPush = ((isBreakBlock) ? ((0 < end-start) ? true : false) : true)
                //if (isPush) { this.#blocks.push(new TextBlock(start, end)) }
                if (isPush) { this.#ranges.push([start, end]) }
                /*
                if (isPush) {
                    console.log(this.#lines.slice(start, end+1).join('\n').trim().length)
                    if (0 < this.#lines.slice(start, end+1).join('\n').trim().length) { this.#ranges.push([start, end]) }
                }
                */
                i = end
            }
            console.debug(this.#blocks)
        }
        #getBlockRangeEnd(start, isBreak=false) {
            for (var i=start; i<this.#lines.length; i++) {
                if (isBreak) { if (this.#lines[i]) { return i-1 } } // BreakBlockRangeEnd
                else { if (!this.#lines[i]) { return i-1 } }        // TextBlockRangeEnd
            }
            return i
        }
        //gets() { return this.#ranges.map((r)=>this.#lines.slice(r[0], r[1]+1).join('\n')) }
        //gets() { return this.#ranges.map((r)=>this.#lines.slice(r[0], r[1]+1).join('\n')) }
        gets() { return this.#ranges.map((r)=>this.#lines.slice(r[0], r[1]+1).join('\n')) }
        get(i) { return this.#lines.slice(this.#ranges[i][0], this.#ranges[i][1]+1).join('\n') }
        now() { return this.#lines.slice(this.#ranges[this.i][0], this.#ranges[this.i][1]+1).join('\n') }
        next() { const s = this.now(); this.i += 1; return s; }
        prev() { const s = this.now(); this.i -= 1; return s; }
        first() { this.seek(0); }
        last() { this.seek(this.#ranges.length-1); }
        seek(i) { if (-1 < i && i < this.#ranges) { this.i = i; return this.now(); } }

        get Ranges() { return this.#ranges }
    }
    window.TextBlock = window.TextBlock || new Lexer()
})();

