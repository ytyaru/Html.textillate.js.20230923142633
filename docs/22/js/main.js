window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    console.log('DOMContentLoaded!!');
    gsap.registerPlugin(TextPlugin);
    let message = getTween()
    /*
    //const message = gsap.set(`#message`, {paused:true})
    const message = gsap.to(`#message`, {
//        duration: ()=>document.querySelector('#duration').value,
//        text: ()=>document.querySelector('#text').value,
        duration: document.querySelector('#duration').value,
        text: document.querySelector('#text').value,
//        duration: 5,
        //stagger: 10.0,
        //speed: 20,
//        text: `このテキストをアニメーションさせる。gsapのTextPluginにより１字ずつ表示している。`,
        ease: `none`,
        //ease: `power2.in`
        //ease: Linear.easeNone,
        paused: true,
        onComplete: (p1,p2)=>{
            console.log(`onComplete !!`, p1, p2)
            document.querySelector('#restart').disabled = false
            document.querySelector('#reverse').disabled = false
            for (let id of ['play','pause','resume']) { document.querySelector(`#${id}`).disabled = true }
//            for (let id of ['play','pause','resume','reverse']) { document.querySelector(`#${id}`).disabled = true }
//            for (let id of ['pause','restart','resume','reverse']) { document.querySelector(`#${id}`).disabled = true }
//            document.querySelector('#restart').disabled = false
        },
        onCompleteParams: ['完了後引数１', '完了後引数２'],
        onInterrupt: (p1,p2)=>{ console.log(`onInterrupt !!`, p1, p2); },
        onInterruptParams: ['中断時引数１', '中断時引数２'],
        onRepeat: (p1,p2)=>{ console.log(`onRepeat !!`, p1, p2); },
        onRepeatParams: ['繰り返し後引数１', '繰り返し後引数２'],
        onReverseComplete: (p1,p2)=>{
            console.log(`onReverseComplete !!`, p1, p2)
            document.querySelector('#restart').disabled = false
            for (let id of ['play','pause','resume','reverse']) { document.querySelector(`#${id}`).disabled = true }
        },
        onReverseCompleteParams: ['逆走完了後引数１', '逆走完了後引数２'],
        onStart: (p1,p2)=>{ console.log(`onStart !!`, p1, p2); },
        onStartParams: ['開始後引数１', '開始後引数２'],
//        onUpdate: (p1,p2)=>{ console.log(`onUpdate !!`, p1, p2); },
//        onUpdateParams: ['更新時引数１', '更新時引数２'],
    });
    */
    // pause:停止,play:再生,restart:最初から再生,resume:途中から再生,reverse:逆再生
    document.querySelector('#play').disabled = false
    document.querySelector('#play').addEventListener('click', async(e) => {
//        message.invalidate()
        message.play() 
        e.target.disabled = true
        document.querySelector('#pause').disabled = false
    })
    document.querySelector('#restart').addEventListener('click', async(e) => {
        message.invalidate()
        message.restart() // pause:停止,play:再生,restart:最初から再生,resume:途中から再生,reverse:逆再生
        e.target.disabled = true
        document.querySelector('#pause').disabled = false
        document.querySelector('#resume').disabled = true
//        document.querySelector('#reverse').disabled = true
    })
    document.querySelector('#pause').addEventListener('click', async(e) => {
//        message.invalidate()
        message.pause() // pause:停止,play:再生,restart:最初から再生,resume:途中から再生,reverse:逆再生
        e.target.disabled = true
        document.querySelector('#restart').disabled = false
        document.querySelector('#resume').disabled = false
        document.querySelector('#reverse').disabled = false
    })
    document.querySelector('#resume').addEventListener('click', async(e) => {
//        message.invalidate()
        message.resume() // pause:停止,play:再生,restart:最初から再生,resume:途中から再生,reverse:逆再生
        e.target.disabled = true
        document.querySelector('#pause').disabled = false
    })
    document.querySelector('#reverse').addEventListener('click', async(e) => {
//        message.invalidate()
        message.reverse() // pause:停止,play:再生,restart:最初から再生,resume:途中から再生,reverse:逆再生
        e.target.disabled = true
        document.querySelector('#pause').disabled = false
        document.querySelector('#resume').disabled = true
    })
    document.querySelector('#duration').addEventListener('input', async(e) => {
//        message.duration = e.target.value
//        gsap.set(`#message`, {duration:e.target.value})
        console.log(`set duration ${e.target.value}`)
        //gsap.set(`#message`, {paused:true})
        //document.querySelector('#message').innerHTML = ''
        //message.invalidate()
        //message.restart()
        //message.validate()
        message.revert()
        message = getTween()
        //const message = gsap.to(`#message`, {duration:e.target.value})
        message.restart()
    })
    document.querySelector('#text').addEventListener('input', async(e) => {
//        message.duration = e.target.value
//        gsap.set(`#message`, {duration:e.target.value})
        console.log(`set text:`, e.target.value)
        //document.querySelector('#message').innerHTML = ''
//        message.invalidate()
        //message.restart()
        message.revert()
        message = getTween()
        message.restart()
    })

    function getTween() { 
        //if (message) { message.revert() }
        return gsap.to(`#message`, {
//        duration: ()=>document.querySelector('#duration').value,
//        text: ()=>document.querySelector('#text').value,
        duration: document.querySelector('#duration').value,
        text: document.querySelector('#text').value,
//        duration: 5,
        //stagger: 10.0,
        //speed: 20,
//        text: `このテキストをアニメーションさせる。gsapのTextPluginにより１字ずつ表示している。`,
        ease: `none`,
        //ease: `power2.in`
        //ease: Linear.easeNone,
        paused: true,
        onComplete: (p1,p2)=>{
            console.log(`onComplete !!`, p1, p2)
            document.querySelector('#restart').disabled = false
            document.querySelector('#reverse').disabled = false
            for (let id of ['play','pause','resume']) { document.querySelector(`#${id}`).disabled = true }
//            for (let id of ['play','pause','resume','reverse']) { document.querySelector(`#${id}`).disabled = true }
//            for (let id of ['pause','restart','resume','reverse']) { document.querySelector(`#${id}`).disabled = true }
//            document.querySelector('#restart').disabled = false
        },
        onCompleteParams: ['完了後引数１', '完了後引数２'],
        onInterrupt: (p1,p2)=>{ console.log(`onInterrupt !!`, p1, p2); },
        onInterruptParams: ['中断時引数１', '中断時引数２'],
        onRepeat: (p1,p2)=>{ console.log(`onRepeat !!`, p1, p2); },
        onRepeatParams: ['繰り返し後引数１', '繰り返し後引数２'],
        onReverseComplete: (p1,p2)=>{
            console.log(`onReverseComplete !!`, p1, p2)
            document.querySelector('#restart').disabled = false
            for (let id of ['play','pause','resume','reverse']) { document.querySelector(`#${id}`).disabled = true }
        },
        onReverseCompleteParams: ['逆走完了後引数１', '逆走完了後引数２'],
        onStart: (p1,p2)=>{ console.log(`onStart !!`, p1, p2); },
        onStartParams: ['開始後引数１', '開始後引数２'],
//        onUpdate: (p1,p2)=>{ console.log(`onUpdate !!`, p1, p2); },
//        onUpdateParams: ['更新時引数１', '更新時引数２'],
    }); } 
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

