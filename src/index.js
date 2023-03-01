/**
 * 发出请求，返回Promise
 * @param {string} url 请求地址
 * @param {number} maxCoutn 最大重试次数
 */

const requeset = (url, maxCoutn) => fetch(url).catch((err) => maxCoutn <= 0 ? Promise.reject(err) : requeset(url, maxCoutn - 1))


const test = document.querySelector('.test');




test.addEventListener('click', function () {
    requeset('http://abc.fsfd.com', 100).then(() => {
        alert('成功')
    }, () => {
        alert('失败')
    })
})