const Http = require('http');
const Path = require('path');
const Fs = require('fs');
const path = require('path');

const hashStr = "A hash string Jiaowensong";
const hash = require('crypto').createHash("sha256").update(hashStr).digest('base64');
console.log(hash)



Http.createServer((req, res) => {
    //获取请求路径
    const url = req.url;
    //完整路径
    let fullPath;
    if (url === '/') {
        //访问的是主页 HTML
        fullPath = path.join(__dirname, 'src/index.html');
    } else {
        fullPath = path.join(__dirname, 'src', url);
        res.writeHead(200, {
            'Cache-Control': 'max-age=10',
            'Etag': hash,
        })
    }

    //根据完整的路径 读取响应位置的文件
    Fs.readFile(fullPath, (err, data) => {
        if (err) {
            //错误 或 文件不存在
            res.end(`<h1>File does not exist</h1>`);
        } else {
            // 成功读取文件 返回给客户端
            res.end(data);
        }
    })
}).listen(9527, () => {
    console.log('===============start==============')
    console.log('http://localhost:9527');
})