import config from './config.js'
const { row, col } = config
/**
 * 创建一个棋盘
 * @param {Element} container 
 */

const creatChessboard = container => {
    const { width, height } = container.getBoundingClientRect()
    let htmlStr = ``;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            htmlStr += `<div class="chess-pieces" data-row=${j} data-col=${i} style="width:${width / row}px; height:${height / row}px;" ></div>`
        }
    }
    container.innerHTML = htmlStr;
}

export default creatChessboard