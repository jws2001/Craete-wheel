const demoBox = document.querySelector('.demo')
const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    demoBox.classList.toggle('active')
})

const init = () => {
    let htmlStr = ``
    const size = 500 / 4
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            htmlStr += `<div class="item" style="background-position:${-j * size}px ${-i * size}px"></div>`
        }
    }
    demoBox.innerHTML = htmlStr
}
init()