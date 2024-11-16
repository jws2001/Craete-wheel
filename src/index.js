const btn = document.querySelector('.btn');
const content = document.querySelector('.content');
const firstItem = document.querySelector('.content .active');

// 获取第一个元素的位置
const getFitstItemTop = () => {
    return firstItem.getBoundingClientRect().top;
}

// First Item 的初始位置
const startTop = getFitstItemTop();
console.log(startTop, 'p=-=-=-=-=-=')


const ref = (run) => {
    requestAnimationFrame(() => {
        run();
    })
}

btn.addEventListener('click', () => {
    content.insertBefore(firstItem, null);
    // 记录结束位置
    const endTop = getFitstItemTop();
    console.log(endTop, 'endTop')

    // 计算元素的移动距离
    const move = startTop - endTop;
    // 将元素移动到初始位置
    firstItem.style.transform = `translateY(${move}px)`;

    ref(() => {
        firstItem.style.transition = `transform 1s`
        firstItem.style.removeProperty('transform');
    })
})