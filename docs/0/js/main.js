window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    console.log('DOMContentLoaded!!');
    $('#target').textillate();
    $('#target').on('end.tlt', ()=>{ $('#start').prop('disabled', false) })
    $('#target').on('start.tlt', ()=>{ $('#start').prop('disabled', true) })
    $('#start').click(()=>{$('#target').textillate('start')})
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

