(() => {
    const signature = document.querySelector('#signature');
    const downLoad = document.querySelector('#downLoad');
    const img = document.querySelector('#img');
    const ctx = signature.getContext('2d');
    let offsetX = 0, offsetY = 0;
    let down = false;
    ctx.lineWidth = 10;
    signature.addEventListener('mousedown', e => {
        down = true;
        const { clientX, clientY } = e;
        const { left, top } = signature.getBoundingClientRect();
        offsetX = left;
        offsetY = top;
        const x = clientX - offsetX;
        const y = clientY - offsetY;
        ctx.beginPath();
        ctx.moveTo(x,y);

    })

    signature.addEventListener('mousemove', e => {
        if (!down) return;
        const { clientX, clientY } = e;
        const x = clientX - offsetX;
        const y = clientY - offsetY;
        ctx.lineTo(x,y);
        ctx.stroke();
    })

    signature.addEventListener('mouseup', e => {
        down = false;
    })


    downLoad.addEventListener('click', () => {
        const url = signature.toDataURL('image/png');
        const a = document.createElement('a');
        a.download = "你的签名";
        a.href = url;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        img.src = url
        // a.remove();
    })
})()