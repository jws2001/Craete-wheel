//获取歌词写入文件
const https = require('https')
const fs = require('fs')
https.get('https://study.duyiedu.com/api/lyrics', res => {
    let result = ``
    res.on('data', chunk => {
        result += chunk
    })

    res.on('end', () => {
        const content = JSON.parse(result)
        console.log(content.data)
        fs.writeFileSync('./lyric.js', `
const lyric = \`${content.data}\`
export default lyric
        `)
    })
})

