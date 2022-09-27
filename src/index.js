(() => {
    // canvas 元素
    const panel = document.querySelector("#panel");

    // 画笔
    const ctx = panel.getContext("2d");

    // 初始颜色
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, panel.width, panel.height)

    // 是否按下
    let isDown = false;

    // size
    const SIZE = 40;

    panel.addEventListener("mousedown", e => {
        isDown = true;
        ctx.beginPath();
    })


    panel.addEventListener("mousemove", e => {
        // 没有按下
        if(!isDown) return;
        const {offsetX, offsetY} = e;
        const startX = offsetX - SIZE / 2 < 0 ? 0 : offsetX - SIZE / 2;
        const startY = offsetY - SIZE / 2 < 0 ? 0 : offsetY - SIZE / 2;
        ctx.clearRect(startX, startY, SIZE, SIZE);

    })


    panel.addEventListener("mouseup", e => {
        isDown = false;
    })
})()