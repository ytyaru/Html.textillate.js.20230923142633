window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    console.log('DOMContentLoaded!!');
    $('body').find('div').textillate({autoStart:false});
    let nowEl = $('div:first')
    let preEl = null
    $('#go').click(()=>{
        nowEl.textillate();
        nowEl.on('end.tlt', (e)=>{ preEl = nowEl.prev('div'); preEl?.textillate('out'); nowEl = nowEl.next('div'); $('#go').prop('disabled', false);  })
        nowEl.on('start.tlt', (e)=>{ $('#go').prop('disabled', true); })
        nowEl.textillate('start')
        preEl?.remove();
    })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

