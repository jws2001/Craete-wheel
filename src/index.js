let controller;
async function getData() {
    try {
        // 把之前的请求取消掉
        controller && controller.abort();
        // 创建一个取消请求的控制器
        controller = new AbortController();
        const data = await fetch('http://localhost', {
            signal: controller.signal, //配置取消请求信号
        }).then(res => res.text())
        console.log(data)
    } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
            console.log(err, '用户终止请求')
        }
    }
}



const breakBtn = document.querySelector('#break');
breakBtn.addEventListener('click', getData)