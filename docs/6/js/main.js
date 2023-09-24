window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    console.log('DOMContentLoaded!!');
    const msgWin = $('body').find('div.message-window')
    msgWin.textillate({autoStart:false})
    let nowScene= msgWin.find('div:first')

    //let nowEl = $('div:first')
    let nowEl = nowScene.find('p:first')
    //let nowEl = nowScene.find('p:first')[0]
    //let nowEl = $(nowScene.find('p:first'))
    let preEl = null
    $('#go').click(()=>{
        console.log('nowEl:', nowEl)
        nowEl.textillate();
        nowEl.on('start.tlt', (e)=>{ $('#go').prop('disabled', true); })
        //nowEl.on('end.tlt', (e)=>{ preEl = nowEl.prev('p'); nowEl = nowEl.next('p'); $('#go').prop('disabled', false);  })
        nowEl.on('end.tlt', (e)=>{ preEl = nowEl.prev('p'); nowEl = nowEl.next('p'); $('#go').prop('disabled', false);  })
        nowEl.textillate('start')

        console.log(`nowEl:`, nowEl.text())
        if (!nowEl.next('p')[0]) {
            console.log('PPPP', nowEl[0], nowEl.next('p')[0])
            /*
            console.log(preEl.parent().text())
            preEl.parent().textillate({autoStart:false});
            preEl.parent().textillate('out');
            preEl.parent().on('end.tlt', (e)=>{ $(this).remove(); nowScene = nowScene.next('div'); })
            */
            //nowScene.find('p').textillate('end')
            //for (var el of nowScene.find('p')) { el.textillate('end') }
            //nowScene.find('p').each((i,el)=>{el.textillate('end')})
            console.log(nowScene.find('p').each((i,el)=>{console.log(el)}))
            console.log(nowScene.find('p'))
            //nowScene.find('p').textillate('end')
            console.log(preEl)
            preEl.textillate('end')
//            nowScene.textillate({autoStart:true,in:{delay:0,delayScale:0},out:{sync:true}});
//            nowScene.textillate('end')
        } else { console.log('NNNNN', nowEl.next('p')[0])}
    })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

