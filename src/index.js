const audio = document.querySelector('audio');
const canDom = document.querySelector('#canvas');
const ctx = canDom.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight / 2;
// 初始化canvas的尺寸
function initCvs() {
    canDom.width = width;
    canDom.height = height;
}
initCvs();


let isInit = false;
const FFTSIZE = 512;
let dataArray;
let analyser;
audio.addEventListener('play', () => {
    if (isInit) return;

    // 初始化
    const audioCtx = new AudioContext(); // 创建音频上下文
    const source = audioCtx.createMediaElementSource(audio); // 创建音频原节点
    // 创建一个音频分析器
    analyser = audioCtx.createAnalyser();

    // 将音频波形 通过快速傅立叶变换
    analyser.fftSize = FFTSIZE;
    dataArray = new Uint8Array(analyser.frequencyBinCount);


    // 创建音频元数据连接到分析器
    source.connect(analyser);
    // 将分析器节点连接到输出设备 这样就能发出声音
    analyser.connect(audioCtx.destination)
    isInit = true;
})

// 将分析出的数据 绘制到canvas上
function draw() {
    requestAnimationFrame(draw);
    if (!isInit) return;
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    // 让分析器节点分析出数据到数组中
    analyser.getByteFrequencyData(dataArray);
    const len = dataArray.length / 2;
    // 每一个柱子的宽度
    const barWidth = width / len / 2;
    ctx.fillStyle = 'green';
    for (let i = 0; i < len; i++) {
        const data = dataArray[i];
        const barHeight = data / 255 * height;
        // 画右边的一半
        const x1 = i * barWidth + width / 2;
        const y1 = height - barHeight;
        const x2 = width / 2 - (i + 1) * barWidth;
        ctx.fillRect(x1, y1, barWidth - 2, barHeight);
        ctx.fillRect(x2, y1, barWidth - 2, barHeight);
    }
}
draw();