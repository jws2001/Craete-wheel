import creatChessboard from './createChessboard.js'
import downChessPieces from './downChessPieces.js'
import restart from './restart.js'
const init = () => {
    const container = document.querySelector('.chessboard')
    // 创建棋盘
    creatChessboard(container)

    //落子事件处理
    downChessPieces(container)

    //重新开始
    restart()
}

init();
