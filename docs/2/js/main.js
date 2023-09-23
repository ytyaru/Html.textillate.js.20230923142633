window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    console.log('DOMContentLoaded!!');
    /*
    $('#target').textillate();
    $('#target').on('end.tlt', ()=>{ $('#params').find('button,input,textarea,select').prop('disabled', false) })
    $('#target').on('start.tlt', ()=>{ $('#params').find('button,input,textarea,select').prop('disabled', true) })
//    $('#target').on('end.tlt', ()=>{ $('#params').prop('disabled', false) })
//    $('#target').on('start.tlt', ()=>{ $('#params').prop('disabled', true) })
//    $('#target').on('end.tlt', ()=>{ $('#start').prop('disabled', false) })
//    $('#target').on('start.tlt', ()=>{ $('#start').prop('disabled', true) })
    
//    $('#start').click(()=>{$('#target').textillate('start')})
    $('#start').click(()=>{$('#target').textillate(); $('#target').textillate('start'); })

    $('#text').on('input', (e)=>{$('#target').text(e.target.value)})
    //$('#text').on('input', (e)=>{console.log(e.target.value, $('#target').text()); $('#target').text(e.target.value); $('#target').textillate();})
    //$('#params').children()
    */

    //$('body').find('p').textillate({autoStart:false, loop:true});
    $('body').find('p').textillate({autoStart:false});
    let nowEl = $('p:first')
    $('#go').click(()=>{
        //nowEl.textillate({autoStart:false, loop:true});
        nowEl.textillate();
        nowEl.on('end.tlt', (e)=>{ nowEl = nowEl.next('p'); $('#go').prop('disabled', false); })
        nowEl.on('start.tlt', (e)=>{ $('#go').prop('disabled', true); })
        nowEl.textillate('start')
    })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

