(() => {
    const ul = document.querySelector('.scroll-container')
    const lis = ul.children

    const cloneFirstItem = () => {
        const firstItem = lis[0];
        ul.appendChild(firstItem.cloneNode(true))
    }

    /**
     * 滚动函数
     * @param {number} duration 间隔时间 
     */
    const moveNext = (duration = 2000) => {

        cloneFirstItem()
        const scorllSize = 30;
        //当前第几项
        let curIndex = 0;

        setInterval(() => {
            //开始位置
            let from = curIndex * scorllSize;
            curIndex++;
            const to = curIndex * scorllSize;

            //变化总时间
            const totalDutation = 500;
            //间隔时间
            const duration = 1000 / 60;
            //总共需要变化的次数
            const times = totalDutation / duration;
            const dit = (to - from) / times;

            const timer = setInterval(() => {
                from += dit;
                ul.scrollTop = from;
                if (from >= to) {
                    clearInterval(timer)
                }
                if (curIndex === lis.length - 1) {
                    curIndex = 0
                }
            }, duration)
        }, duration)

    }
    moveNext();

})()