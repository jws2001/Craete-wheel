export default class {
    #dom;
    #curDate;
    #nextDate;
    constructor(cur, next, dom) {
        const ch = dom.children;
        this.#dom = ch;
        ch[0].innerHTML = next;
        ch[1].innerHTML = next;
        ch[2].innerHTML = cur;
        ch[3].innerHTML = cur;
        this.registerEvent(ch[1])
    }

    /**
     * 
     * @param {Element} dom 
     */
    registerEvent(dom) {
        dom.addEventListener('transitionend', () => {
            this.#dom[1].style.transition = 'none';
            this.#dom[2].style.transition = 'none';
            this.#dom[1].classList.remove('rotateX0');
            this.#dom[2].classList.remove('rotateX180');
            this.setTime();
        })
    }


    update(curDate, nextDate) {
        this.#curDate = curDate;
        this.#nextDate = nextDate;
        this.#dom[1].style.transition = 'all .5s';
        this.#dom[2].style.transition = 'all .5s';
        this.#dom[1].classList.add('rotateX0');
        this.#dom[2].classList.add('rotateX180');
        
    }

    setTime() {
        this.#dom[0].innerHTML = this.#nextDate;
        this.#dom[1].innerHTML = this.#nextDate;
        this.#dom[2].innerHTML = this.#curDate;
        this.#dom[3].innerHTML = this.#curDate;
    }
}