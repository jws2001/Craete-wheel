const demoDom = document.querySelector('.demo');
demoDom.addEventListener('click', e => {
    const target = e.target;
    if (target.className !== 'item') return;
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            target.remove();
        });
    } else {
        target.remove();
    }
})