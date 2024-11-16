import Flip from './flip.js';

const btn = document.querySelector('.btn');
const content = document.querySelector('.content');
const children = Array.from(content.children);
const fiipList = [];
children.forEach((item) => {
    const flip = new Flip(item, 'Y');
    fiipList.push(flip);
})


btn.addEventListener('click', () => {

    // 记录初始位置
    fiipList.forEach((flip) => {
        flip.first();
    })

    // 改变 content 子元素结构
    children.forEach(() => {
        content.insertBefore(children[random(0, children.length - 1)], children[random(0, children.length - 1)]);
    })

    // 记录结束位置
    fiipList.forEach((flip) => {
        flip.last();
        flip.invert();
    })

    run(() => {
        fiipList.forEach((flip) => {
            flip.play();
        })
    });

})


// 随机数
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function run(fun) {
    requestAnimationFrame(fun);
}