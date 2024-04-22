const btn = document.querySelector('.change');


btn.addEventListener('click', e => {
    const transition = document.startViewTransition(e => {
        document.documentElement.classList.toggle('dark');
    })

    const x = e.clientX;
    const y = e.clientY;
    transition.ready.then(() => {
        document.documentElement.animate({
            clipPath: [`circle(0% at ${x}px ${y}px)`, `circle(100% at 50% 50%)`]
        }, {
            duration: 1000,
            pseudoElement: '::view-transition-new(root)'
        })
    })
})