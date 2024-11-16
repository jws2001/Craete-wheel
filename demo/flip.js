class Flip {
    // 元素
    #dom;
    // 方向
    #direction;

    // 开始位置信息
    #startPos;
    // 结束位置信息
    #endPos;

    runing = false

    /**
     * 
     * @param {HTMLElement} dom 
     * @param {'X' | 'Y'} direction 
     */
    constructor(dom, direction) {
        this.#dom = dom;
        this.#direction = direction;
        this.#dom.addEventListener('transitionend', () => {
            this.#dom.style.removeProperty('transition');
        });
    }

    get directionProps() {
        return this.#direction === 'X' ? 'left' : 'top';
    }

    // 记录初始位置
    first() {
        const rect = this.#dom.getBoundingClientRect();
        this.#startPos = {
            [this.directionProps]: rect[this.directionProps]
        }
    }

    // 记录结束位置
    last() {
        const rect = this.#dom.getBoundingClientRect();
        this.#endPos = {
            [this.directionProps]: rect[this.directionProps]
        }
    }

    // 回到初始位置
    invert() {
        const val = `translate${this.#direction}(${this.#startPos[this.directionProps] - this.#endPos[this.directionProps]}px)`;
        this.#dom.style.transform = val;
    }

    // 播放动画
    play() {
        this.runing = true
        this.#dom.style.transition = `transform 1s`
        this.#dom.style.removeProperty('transform');
    }
}


export default Flip;