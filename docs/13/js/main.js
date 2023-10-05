window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    /*
    console.log('DOMContentLoaded!!');
    const msgWin = $('body').find('div.message-window')
    msgWin.textillate({autoStart:false})
    let nowScene = msgWin.find('div:first')
    let preScene = null
    //let nowEl = $('div:first')
    let nowEl = nowScene.find('p:first')
    //let nowEl = nowScene.find('p:first')[0]
    //let nowEl = $(nowScene.find('p:first'))
    let preEl = null
    $('#go').click(()=>{
        console.log(`preEl:`, preEl?.text())
        console.log(`nowEl:`, nowEl?.text())
        console.log(`preScene:`, preScene)
        console.log(`nowScene:`, nowScene)
        if (preScene) {
            console.log(`<preScene clear>`)
            preScene.children('p').textillate('out')
//            preScene.children('p').on('start.tlt', (e)=>{ $('#go').prop('disabled', true) })
//            preScene.children('p').on('end.tlt', (e)=>{ console.log('preScene.end!!'); $('#go').prop('disabled', false); nowScene = nowScene.next('div'); nowEl = nowScene.find('p:first'); preScene = null; })
            return
        }
        if (0 < nowEl.length) {
        //if (nowEl.next('p')[0]) {
        //if (nowEl!==nowScene.find('p:last')) {
            console.log('<NextTips>:', nowEl[0], nowEl.next('p')[0])
            nowEl.textillate({autoStart:false});
            nowEl.on('start.tlt', (e)=>{ $('#go').prop('disabled', true); })
            //nowEl.on('end.tlt', (e)=>{ preEl = $(e.target); nowEl = $(e.target).next('p'); $('#go').prop('disabled', false);   console.log('end.tlt', nowEl, preEl); })
            nowEl.on('end.tlt', (e)=>{
                preEl = $(e.target)
                nowEl = $(e.target).next('p')
                console.log('end.tlt', nowEl, preEl)
                $('#go').prop('disabled', false)
            })
            nowEl.on('outAnimationEnd.tlt', (e)=>{
                console.log(`outAnimationEnd.tlt !!`)
                if (0===nowEl.length) {
                    console.log('preEl.end!!')
                    //nowScene.css('display', 'none')
                    preScene = nowScene
                    nowScene = nowScene.next('div')
                    nowEl = nowScene.find('p:first');
                }
            })
            nowEl.textillate('start')
        } else {
            //$('#go').prop('disabled', true);
            console.log('<SceneClear>:', preEl, preEl.prev('p'), preEl.prevAll('p'))
            console.log(nowScene.children('p'))
            nowScene.children('p')?.textillate('out')
            nowScene.children('p').on('end.tlt', (e)=>{ console.log('preEl.end!!'); nowScene = nowScene.next('div'); nowEl = nowScene.find('p:first'); })
            //preEl.on('end.tlt', (e)=>{ console.log('preEl.end!!'); nowScene = nowScene.next('div'); nowEl = nowScene.find('p:first'); })
        }
    })
    $('#out').click(()=>{
//        msgWin.find('p').textillate({autoStart:false});
//        msgWin.find('p').textillate('end');
        console.log()
        $('p#test').textillate({autoStart:false});
        $('p#test').textillate('out');
    })
    */
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

