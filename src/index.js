const map = document.querySelector('#map');
const ball = document.querySelector('#ball');
const cvs = map.getContext('2d');
// 速度
const SPEED = 1;
const { width, height, offsetLeft, offsetTop } = map;
//图片像素信息坐标
const imgPointPxData = new Map();

let keyLetter;
document.addEventListener('keydown', e => {
    keyLetter = e.key;
})

// 移动
const move = () => {
    const { offsetLeft:left, offsetTop:top, clientWidth:w, clientHeight:h } = ball;
    console.log(left,top,w,h)
    switch (true) {
        case !!(keyLetter === 'w' && imgPointPxData.get(`${left}-${top - SPEED}`) !== true):
            ball.style.top = top - SPEED + 'px';
            break;
        case !!(keyLetter === 's' && imgPointPxData.get(`${left}-${top + SPEED + h}`) !== true):
            ball.style.top = top + SPEED + 'px';
            break;
        case !!(keyLetter === 'a' && imgPointPxData.get(`${left - SPEED}-${top}`) !== true):
            ball.style.left = left - SPEED + 'px';
            break;
        case !!(keyLetter === 'd' && imgPointPxData.get(`${left + SPEED + w}-${top}`) !== true):
            ball.style.left = left + SPEED + 'px';
            break;
        default:
            break;
    }
    requestAnimationFrame(move)
}

const handlePxData = data => {
    let x = 0;
    for(let i = 0, len = data.length; i < len; i += 4){
        if(data[i] !== 255 && data[i + 1] !== 255 && data[i + 2] !== 255){
            imgPointPxData.set(`${x % width + offsetLeft + 7}-${Math.ceil(x / width + offsetTop)}`, true)
        }
        x ++;
    }
}


(() => {
    const mapImg = new Image();
    mapImg.addEventListener('load', () => {
        cvs.fillStyle = "#fff";
        cvs.fillRect(0, 0, width, height);
        cvs.drawImage(mapImg, 0, 0, width, height);
        const pxData = cvs.getImageData(0, 0, width, height);
        handlePxData(pxData.data)
    })
    mapImg.setAttribute('src', './map.png');
    move();
})()
