const ul = document.querySelector('#list');

//当前拖拽的元素
let currentTarget = null;
const dragstart = event => {
    currentTarget = event.target;
    setTimeout(() => {
        currentTarget.classList.add('moveIng')
    }, 0)
}

const dragenter = event => {
    event.preventDefault();
    //排除自己和父级
    if (event.target === currentTarget || event.target === ul) return;
    //判断当前拖动的方向
    const listChildren = Array.from(ul.children);
    //当前拖动元素的下标
    const sourceIndex = listChildren.indexOf(listChildren);
    //被进入拖动的下标
    const targetIndex = listChildren.indexOf(event.target);
    if(sourceIndex < targetIndex){
        ul.insertBefore(currentTarget, event.target.nextElementSibling)
    }else{
        ul.insertBefore(currentTarget, event.target)
    }
}

const dragent = event => {
    event
    currentTarget.classList.remove('moveIng');
}

//开始拖动
ul.addEventListener('dragstart', dragstart)

//拖动移入
ul.addEventListener('dragenter', dragenter)

//拖动完成
ul.addEventListener('dragend', dragent)

ul.addEventListener('dragover', event => {
    event.preventDefault();
})

window.addEventListener('dragover', event => {
    event.preventDefault();
})