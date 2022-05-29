<template>
    <div class="container" :style="{
        width: `${config.width}px`,
        height: `${config.height}px`
    }">
        <table @mouseup="handleClick">
            <tbody>
                <tr v-for="row, x in squares">
                    <td v-for="square, y in row" :style="{
                        width: `${config.width / config.row}px`,
                        height: `${config.height / config.col}px`
                    }" :data-x="x" :data-y="y"
                        :class="[square.isClick && typeof square.value === 'number' ? numberClass[square.value - 1] : '', square.isClick ? 'show' : '', square.rigth ? 'rigth' : '']">
                        {{
                                square.isClick ? square.value : ''
                        }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <p>
        剩余雷数:{{ residue }}
    </p>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

//配置选项
const config = reactive({
    row: 15,
    col: 15,
    size: 30,
    width: 700,
    height: 700
})
//剩余雷数
const residue = ref<number>(config.size)

//数字样式
const numberClass = reactive(['_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8'])

//游戏是否结束
const gameOVer = ref(false)

//生成一个随机雷的数组
let landmine: number[] = new Array(config.row * config.col).fill(0);
landmine.forEach((item, i) => landmine[i] = i);
landmine.sort(() => Math.random() - 0.5)
landmine = landmine.slice(0, config.size);

//生成方块的信息
interface Square {
    type: 'mine' | 'number' | "";
    value: number | '' | '雷';
    isClick: boolean;
    rigth: boolean
}
const squares = reactive<Square[][]>([])
let count: number = 0;
for (let row = 0; row < config.row; row++) {
    squares.push([])
    for (let col = 0; col < config.col; col++) {
        //存在就是一个雷
        const square: Square = {
            type: 'number',
            value: 0,
            isClick: false,
            rigth: false
        }
        if (landmine.includes(count)) {
            square.type = "mine"
            square.value = '雷'
        } else {
            square.type = "number"
        }
        squares[row].push(square)
        count++
    }
}

//对雷的数字进行处理
for (let row = 0, len = squares.length; row < len; row++) {
    const item = squares[row];
    for (let col = 0, len1 = item.length; col < len1; col++) {
        const square: Square = item[col];
        if (square.type === "mine") continue
        //不是雷 看周围有几颗雷
        const rowDown = row - 1, rowTop = row + 1, colDowm = col - 1, colTop = col + 1
        if (rowDown >= 0) {
            //左上
            if (colDowm >= 0 && squares[rowDown][colDowm].type === 'mine') {
                typeof square.value === 'number' && square.value++
            }
            //上
            if (squares[rowDown][col].type === 'mine') {
                typeof square.value === 'number' && square.value++
            }
            //右上
            if (colTop < len1 && squares[rowDown][colTop].type === 'mine') {
                typeof square.value === 'number' && square.value++
            }
        }
        //右
        if (colTop < len1 && squares[row][colTop].type === 'mine') {
            typeof square.value === 'number' && square.value++
        }
        if (rowTop < len) {
            //右下
            if (colTop < len && squares[rowTop][colTop].type === 'mine') {
                typeof square.value === 'number' && square.value++
            }
            //下
            if (squares[rowTop][col].type === 'mine') {
                typeof square.value === 'number' && square.value++
            }
            //左下
            if (colDowm >= 0 && squares[rowTop][colDowm].type === 'mine') {
                typeof square.value === 'number' && square.value++
            }
        }
        //左
        if (colDowm >= 0 && squares[row][colDowm].type === 'mine') {
            typeof square.value === 'number' && square.value++
        }
        if (square.value === 0) {
            //周围一个雷也没有
            square.type = '';
            square.value = ''
        }
    }
}

//取消鼠标右击默认事件
document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
})

//判断游戏是否胜利
const isGameOver = () => {
    let count = 0;
    squares.forEach((row: Square[]) => {
        row.forEach((square: Square) => {
            if (!square.isClick) {
                count++
            }
        })
    })
    return count === config.size ? true : false
}

//处理空白
const handleBlank = (x: number, y: number, square: Square) => {
    if (square.isClick) return
    const xDown = x - 1, xTop = x + 1, yDown = y - 1, yTop = y + 1;
    square.isClick = true;
    if (xDown >= 0) {
        //左上
        if (yDown >= 0) {
            const sq = squares[xDown][yDown];
            if (sq.type === 'number') {
                sq.isClick = true
            }
        }
        //上
        const sq = squares[xDown][y]
        if (sq.type === '') {
            handleBlank(xDown, y, sq)
        } else {
            sq.isClick = true
        }
        //右上
        if (yTop < config.col) {
            const sq = squares[xDown][yTop]
            if (sq.type === 'number') {
                sq.isClick = true
            }
        }
    }
    //右
    if (yTop < config.col) {
        const sq = squares[x][yTop]
        if (sq.type === '') {
            handleBlank(x, yTop, sq)
        } else {
            sq.isClick = true
        }
    }
    //左
    if (yDown >= 0) {
        const sq = squares[x][yDown]
        if (sq.type === '') {
            handleBlank(x, yDown, sq)
        } else {
            sq.isClick = true
        }
    }
    if (xTop < config.row) {
        //右下
        if (yTop < config.col) {
            const sq = squares[xTop][yTop]
            if (sq.type === 'number') {
                sq.isClick = true
            }
        }
        //下
        const sq = squares[xTop][y]
        if (sq.type === '') {
            handleBlank(xTop, y, sq)
        } else {
            sq.isClick = true
        }
        //左下
        if (yDown >= 0) {
            squares[xTop][yDown].isClick = true
            const sq = squares[xTop][yDown]
            if (sq.type === 'number') {
                sq.isClick = true
            }
        }
    }
}

//点击到了雷
const handleMine = () => {
    squares.forEach((row: Square[]) => {
        row.forEach((square: Square) => {
            if (square.type === 'mine') {
                square.isClick = true
                square.rigth = false
            }
        })
    })
}

//处理点击事件
const handleClick = (event: MouseEvent) => {
    if (gameOVer.value) return
    const { target, button } = event
    if ((target as HTMLElement).nodeName !== 'TD') return

    const { dataset: { x, y } } = (target as HTMLElement)
    if (!x || !y) return
    //取出当前点击的数据信息
    const square = squares[+x][+y]
    //如果被点击过 则不处理
    if (square.isClick) return

    if (button === 0) {
        //鼠标左键
        if (square.type === 'mine') {
            //点击的是雷 游戏结束
            gameOVer.value = true;
            // alert('游戏结束')
            handleMine()
            return
        }
        if (square.type === 'number') {
            //数字
            square.isClick = true
        } else if (square.type === '') {
            //空白 旁边的所有都要点开
            handleBlank(+x, +y, square)
        }

        //判断游戏是否结束
        if (isGameOver()) {
            gameOVer.value = true;
            handleMine();
            alert('游戏胜利')
        }

    } else if (button === 2) {
        //鼠标右键
        square.rigth = !square.rigth;
        if (square.rigth) residue.value--
    }
}


</script>

<style>
.container {
    margin: 0 auto;
}

table {
    width: 100%;
    height: 100%;
    border-spacing: 1px;
    background-color: #929196;
    cursor: pointer;
}

td {
    padding: 0;
    background-color: #ccc;
    border: 2px solid;
    border-color: #fff #a1a1a1 #a1a1a1 #fff;
    text-align: center;
    box-sizing: border-box;
    font-weight: bold;
    position: relative;
}

td.show {
    border: none;
    font-weight: bold;
    background-color: transparent;
    border: 2px solid #ccc;
}

p {
    padding-top: 20px;
    text-align: center;
}

.rigth::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

._1 {
    color: blue;
}

._2 {
    color: green;
}

._3 {
    color: red;
}

._4 {
    color: royalblue;
}

._5 {
    color: sienna;
}

._6 {
    color: aquamarine;
}

._7 {
    color: tomato;
}

._8 {
    color: yellow;
}
</style>
