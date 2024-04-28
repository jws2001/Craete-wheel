const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.backgroundColor = '#000';


const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Round {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.xSpeed = random(1, 50);
        this.ySpeed = random(1, 50);
        this.lastDrawTime = null;
    }
    draw() {
        if (this.lastDrawTime) {
            let newX = this.x + (this.xSpeed * (Date.now() - this.lastDrawTime)) / 1000;
            let newY = this.y + (this.ySpeed * (Date.now() - this.lastDrawTime)) / 1000;
            if (newX < 0) {
                newX = 0;
                this.xSpeed = -this.xSpeed;
                this.ySpeed = -this.ySpeed;
            }
            if (newX > canvas.width - this.r) {
                newX = canvas.width - this.r;
                this.xSpeed = -this.xSpeed;
                this.ySpeed = -this.ySpeed;
            }
            if (newY < 0) {
                newY = 0;
                this.xSpeed = -this.xSpeed;
                this.ySpeed = -this.ySpeed;
            }
            if (newY > canvas.height - this.r) {
                newY = canvas.height - this.r;
                this.xSpeed = -this.xSpeed;
                this.ySpeed = -this.ySpeed;
            }
            this.x = newX
            this.y = newY
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        this.lastDrawTime = Date.now();
    }
}


class Chart {
    constructor(count) {
        this.roundList = new Array(count).fill(0).map(() => new Round(random(0, canvas.width), random(0, canvas.height), 5, '#fff'));
        this.distance = 300;
        this.stop = false;
    }
    draw() {
        if(this.stop) return;
        requestAnimationFrame(() => this.draw());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0, len = this.roundList.length; i < len; i++) {
            const round = this.roundList[i];
            round.draw();
            for (let j = i + 1; j < len; j++) {
                const round2 = this.roundList[j];
                //记录两点之间的距离
                const distance = Math.sqrt(Math.pow(round.x - round2.x, 2) + Math.pow(round.y - round2.y, 2));
                if (distance > this.distance) continue;
                ctx.beginPath();
                ctx.moveTo(round.x, round.y);
                ctx.lineTo(round2.x, round2.y);
                ctx.closePath();
                ctx.strokeStyle = `rgba(200,200,200,${1 - distance / this.distance})`;
                ctx.stroke();
            }
        }
    }

    pause(){
        this.stop = true;
    }

    play(){
        this.stop = false;
        this.draw();
    }
    active(x, y) {

    }
}

const map = new Chart(30);
map.play();



canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    map.active(x, y)
})


window.addEventListener('visibilitychange',() => {
    if(document.hidden){
        // 隐藏
        map.pause();
    }else{
        map.play();
    }
})