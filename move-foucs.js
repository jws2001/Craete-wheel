export default class MoveFocus {
    constructor(options = {
        scollWrapper: null, // 滚动容器
        domLinkedList: [], // dom 链表
        curLinkObj: null
    }) {
        this.moveDom = null;
        this.options = options;
        this.init();
    }

    init() {
        this.cloneNode();
        this.EventKeyDown();
    }

    cloneNode() {
        const { curLinkObj } = this.options;
        const rect = curLinkObj.cur.getBoundingClientRect();
        const moveDom = curLinkObj.cur.cloneNode();
        moveDom.style.position = 'absolute';
        moveDom.style.left = rect.left + 'px';
        moveDom.style.top = rect.top + 'px';
        moveDom.style.width = rect.width + 'px';
        moveDom.style.height = rect.height + 'px';
        moveDom.style.zIndex = 9999;
        moveDom.style.border = '2px solid red';
        moveDom.style.boxSizing = 'border-box'
        moveDom.style.transition = 'all .1s'
        document.body.appendChild(moveDom);
        this.moveDom = moveDom;
    }

    changeMoveDom(type) {
        const prevDom = this.options.curLinkObj[type].cur
        const rect = prevDom.getBoundingClientRect();
        this.moveDom.style.left = rect.left + 'px';
        this.moveDom.style.top = rect.top + 'px';
        this.moveDom.style.width = rect.width + 'px';
        this.moveDom.style.height = rect.height + 'px';
    }

    ArrowUp() {
        this.changeMoveDom('prev');
        this.options.curLinkObj = this.options.curLinkObj.prev

    }

    ArrowDown() {
        this.changeMoveDom('next');
        this.options.curLinkObj = this.options.curLinkObj.next
    }

    keyDown(e, _this) {
        switch (e.code) {
            case 'ArrowUp':
                this.ArrowUp();
                break;
            case 'ArrowDown':
                this.ArrowDown();
                break;
            default:
                return;

        }

    }


    EventKeyDown() {
        window.addEventListener('keydown', this.keyDown.bind(this))
    }


    unInit() {
        window.removeEventListener('keydown', this.keyDown)
    }
}