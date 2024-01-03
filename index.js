import MoveFocus from "./move-foucs.js";

const wrapper = document.querySelector('.wrapper');

const itemAll = document.querySelectorAll('.item');

const domLinkedList = [];


for (let i = 0; i < itemAll.length; i++) {
    const item = itemAll[i];
    const obj = {};
    obj.prev = null;
    obj.next = null;
    obj.cur = item
    domLinkedList.push(obj);
}

for (let i = 0; i < domLinkedList.length; i++) {
    const item = domLinkedList[i];
    if (i === 0) {
        item.prev = domLinkedList[domLinkedList.length - 1];
        item.next = domLinkedList[i + 1];
    } else if (i === domLinkedList.length - 1) {
        item.next = domLinkedList[0];
        item.prev = domLinkedList[i - 1];
    } else {
        item.next = domLinkedList[i + 1];
        item.prev = domLinkedList[i - 1];
    }
}

const moveFocus = new MoveFocus({
    scollWrapper: wrapper,
    domLinkedList,
    curLinkObj: domLinkedList[0]
})


moveFocus.addEventListener('change', e => {
    console.log(e,'====--==--==')
})