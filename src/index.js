function getData() {
    return fetch('https://api.gugudata.com/location/chinaregions/demo');
}


function m1() {
    return getData();
}


function m2() {
    return m1();
}

function m3() {
    return m2();
}
function test() {
    const addressData = m3()
    console.log(addressData)
}


function runAsync(func) {
    // 缓存结果
    const cache = [];
    let i = 0;
    const _originFetch = window.fetch;
    window.fetch = (...args) => {
        if (cache[i]) {
            // 交付缓存结果
            if (cache[i].status === 'fulfilled') {
                return cache[i].data
            } else if (cache[i].status === 'rejected') {
                return cache[i].err
            }
        }
        const result = {
            status: "pending",
            data: null,
            err: null
        }
        cache[i++] = result;
        // 发送请求
        const prom = _originFetch(...args).then(res => res.json()).then(data => {
            result.status = 'fulfilled'
            result.data = data
        }, err => {
            result.status = 'rejected'
            result.err = err
        })

        // 报错
        throw prom;
    }
    try {
        func();
    } catch (err) {
        // 什么时候引发重新执行
        // window.fetch = _originFetch
        if (err instanceof Promise) {
            const reRun = () => {
                i = 0;
                func()
            }
            err.then(reRun, reRun)
        }
    }
}

runAsync(test);



