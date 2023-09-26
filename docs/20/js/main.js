window.addEventListener('DOMContentLoaded', (event) => { // https://github.com/jschr/textillate
    console.log('DOMContentLoaded!!');

    gsap.registerPlugin(TextPlugin);
    gsap.to(`#message`, {
        duration: 5,
        //speed: 20,
        text: `このテキストをアニメーションさせる。gsapのTextPluginにより１字ずつ表示している。`,
        //ease: `power2.in`
        ease: `none`,
        //ease: Linear.easeNone,
    });
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

