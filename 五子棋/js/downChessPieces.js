import config from './config.js'
//游戏是否结束
let gameOver = false;

//创建的棋子
const chessList = [];

//创建棋子
const createChess = (chessInfo, width, height) => {
    const chess = document.createElement('div');
    chess.classList.add('chess', chessInfo.color)
    chess.style.left = chessInfo.x * width + 'px';
    chess.style.top = chessInfo.y * height + 'px';
    chess.style.width = width * 0.8 + 'px'
    chess.style.height = height * 0.8 + 'px'
    return chess
}

//判断是否胜利
const victory = chessList => {
    for (let i = 0, len = chessList.length; i < len; i++) {
        const chess = chessList[i];
        let chess2, chess3, chess4, chess5;
        //横向
        chess2 = chessList.find(item => chess.color === item.color && item.x === chess.x + 1 && item.y === chess.y)
        chess3 = chessList.find(item => chess.color === item.color && item.x === chess.x + 2 && item.y === chess.y)
        chess4 = chessList.find(item => chess.color === item.color && item.x === chess.x + 3 && item.y === chess.y)
        chess5 = chessList.find(item => chess.color === item.color && item.x === chess.x + 4 && item.y === chess.y)
        if (chess2 && chess3 && chess4 && chess5) return true
        //纵向
        chess2 = chessList.find(item => chess.color === item.color && item.y === chess.y + 1 && item.x === chess.x)
        chess3 = chessList.find(item => chess.color === item.color && item.y === chess.y + 2 && item.x === chess.x)
        chess4 = chessList.find(item => chess.color === item.color && item.y === chess.y + 3 && item.x === chess.x)
        chess5 = chessList.find(item => chess.color === item.color && item.y === chess.y + 4 && item.x === chess.x)
        if (chess2 && chess3 && chess4 && chess5) return true
        //左到右斜线
        chess2 = chessList.find(item => chess.color === item.color && item.x === chess.x + 1 && item.y === chess.y + 1)
        chess3 = chessList.find(item => chess.color === item.color && item.x === chess.x + 2 && item.y === chess.y + 2)
        chess4 = chessList.find(item => chess.color === item.color && item.x === chess.x + 3 && item.y === chess.y + 3)
        chess5 = chessList.find(item => chess.color === item.color && item.x === chess.x + 4 && item.y === chess.y + 4)
        if (chess2 && chess3 && chess4 && chess5) return true
        //右到左斜线
        chess2 = chessList.find(item => chess.color === item.color && item.x === chess.x - 1 && item.y === chess.y + 1)
        chess3 = chessList.find(item => chess.color === item.color && item.x === chess.x - 2 && item.y === chess.y + 2)
        chess4 = chessList.find(item => chess.color === item.color && item.x === chess.x - 3 && item.y === chess.y + 3)
        chess5 = chessList.find(item => chess.color === item.color && item.x === chess.x - 4 && item.y === chess.y + 4)
        if (chess2 && chess3 && chess4 && chess5) return true
    }
    return false
}

/**
 * 落子处理
 * @param {Element} container 
 */
const downChessPieces = container => {
    let color = 'black'; //white
    const { width, height } = container.getBoundingClientRect();
    const chessWdith = width / config.row;
    const chessHeight = width / config.col;
    container.addEventListener('click', ({ target, offsetX, offsetY }) => {
        if (!target.className.includes('chess-pieces') || gameOver) return;
        //目前点击棋盘的坐标
        const pointer = target.dataset;
        const row = parseInt(pointer.row)
        const col = parseInt(pointer.col)
        //判断点击的是哪一个方位
        const chessInfo = {
            color
        };
        if (offsetX <= chessWdith / 2 && offsetY <= chessHeight / 2) {
            //左上
            chessInfo.x = row;
            chessInfo.y = col;
        } else if (offsetX >= chessWdith / 2 && offsetY <= chessHeight / 2) {
            //右上
            chessInfo.x = row + 1;
            chessInfo.y = col;
        } else if (offsetX <= chessWdith / 2 && offsetY >= chessHeight / 2) {
            //左下
            chessInfo.x = row;
            chessInfo.y = col + 1;
        } else if (offsetX >= chessWdith / 2 && offsetY >= chessHeight / 2) {
            //右下
            chessInfo.x = row + 1;
            chessInfo.y = col + 1;
        }

        //判断该位置是否已经有棋子
        const isDown = chessList.find(item => item.x === chessInfo.x && item.y === chessInfo.y);
        if (isDown) return;
        color = color === 'black' ? "white" : 'black';
        //创建一个棋子
        const chess = createChess(chessInfo, chessWdith, chessHeight);
        container.appendChild(chess);
        chessList.push({
            ...chessInfo,
            chess
        })
        if (victory(chessList)) {
            gameOver = true;
            chessList.forEach((item, index) => {
                item.chess.innerText = index + 1
            })
        } else {
            console.log('游戏继续')
        }
    })
}

export default downChessPieces