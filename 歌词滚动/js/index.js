//歌词
import lyric from '../js/lyric.js'
import createLyricDom from './createLyricDom.js'

//歌词信息
let lyricInfo;

const dom = {
    ul: document.querySelector('.lyric-box'),
    audio: document.querySelector('.audio'),
    lyricContent: document.querySelector('.lyric-content'),
    liHeight: 30,
    containerHeight: 600,
}

//处理歌词
const disposeLrtic = lyricStr => {
    return lyricStr.split('\n').map(str => {
        const ar = str.split(']')
        const date = ar[0].slice(1).split(':')
        return {
            time: +date[0] * 60 + +date[1],
            content: ar[1],
        }
    })
}

const init = () => {

    lyricInfo = disposeLrtic(lyric)
    //创建歌词
    dom.ul.innerHTML = createLyricDom(lyricInfo)

    //注册事件
    dom.audio.addEventListener('timeupdate', () => {

        //当前播放时间
        const currentTime = dom.audio.currentTime + 0.5;
        //从歌词信息里面找到第一个当前时间大的下标减一
        let index;
        for (let i = 0, len = lyricInfo.length; i < len; i++) {
            if (lyricInfo[i].time > currentTime) {
                index = i
                break
            }
        }
        index = index === 0 ? index : index - 1;
        dom.ul.querySelector('.active') && dom.ul.querySelector('.active').classList.remove('active');
        dom.ul.children[index].classList.add('active')

        //歌词滚动
        const offsetY = index * dom.liHeight + dom.liHeight / 2 - dom.containerHeight / 2;
        dom.ul.style.transform = `translateY(${-offsetY}px)`
    })
}


init()