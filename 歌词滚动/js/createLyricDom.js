const createLyricDom = lyricInfo => lyricInfo.map(lyric => `<li>${lyric.content}</li>`).join('')
export default createLyricDom