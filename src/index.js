const canvas = document.querySelector('#canvas');
const video = document.querySelector('#video');
const btn = document.querySelector('button');
const img = document.querySelector('img');
const cvs = canvas.getContext('2d');

//设置宽高
const SIZE = 400;
canvas.width = canvas.height = video.width = video.height = SIZE;

//调用摄像头 配置分辨率 400
navigator.mediaDevices.getUserMedia({
    // audio:true,
    video: {
        width: SIZE,
        height: SIZE
    }
}).then(stream => {
    //stream 是一个流数据
    video.srcObject = stream;

    //等待流数据加载完毕事件
    video.onLoadedmetadata = () => video.play();
}).catch(() => {
    alert('访问错误！')
})


btn.addEventListener('click', () => {
    cvs.drawImage(video, 0, 0, SIZE, SIZE);
    img.src = canvas.toDataURL('image/png');
    img.style.display = ''
})