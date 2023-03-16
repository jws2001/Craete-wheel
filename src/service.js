const HTTP = require('http');

const handle = (req, res) => {
    setTimeout(() => {
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        })
        res.end('焦文松')
    }, 3000)
}

const service = HTTP.createServer(handle);



service.listen(80, () => {
    console.log(`监听 80 端口`)
})