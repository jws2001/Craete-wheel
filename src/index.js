const dateDom = document.querySelector('.date');

const init = () => {
    dateDom.innerHTML = new Date().toLocaleString();
    requestAnimationFrame(init)
}
init();