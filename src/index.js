//列宽
const COLWIDTH = 20;
//字体大小
const FONTSIZE = 16;
//颜色
const FONTCOLOR = "#00ff00";
//列数
const COLCOUNT = Math.floor(window.innerWidth / COLWIDTH);
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

//记录每一列当前写到了第几行
const colNextIndexs = new Array(COLCOUNT).fill(1);

//得到随机的 1 || 0
const getNumber = () => {
    return Math.random() > 0.5 ? "1" : "0";
}

//canvas
const cracker = document.querySelector("#cracker");

//设置宽度
cracker.width = WIDTH;
cracker.height = HEIGHT;

//画笔
const ctx = cracker.getContext("2d");

//绘画函数
const draw = () => {
    //半透明
    ctx.fillStyle = `rgba(0,0,0,.1)`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    //设置文字填充颜色
    ctx.fillStyle = FONTCOLOR;
    //字体大小
    ctx.font = `${FONTSIZE}px  "Roboto Mono"`;

    for (let i = 0, len = colNextIndexs.length; i < len; i++) {
        const x = i * COLWIDTH;
        const y = colNextIndexs[i] * COLWIDTH;
        ctx.fillText(getNumber(), x, y);
        if (y > HEIGHT && Math.random() > 0.99) {
            colNextIndexs[i] = 0;
        } else {
            colNextIndexs[i]++
        }
    }
}

setInterval(draw, 40)