function delay(time) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })
}

class SuerTask {
    constructor(count = 2) {
        this.count = count; // 最大并发数
        this.runingCount = 0; // 当前正在运行的数量
        this.tasks = [];
    }
    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            })
            this.#run();
        })
    }
    #run() {
        while (this.tasks.length && this.runingCount < this.count) {
            const { task, resolve, reject } = this.tasks.shift();
            this.runingCount++;
            task().then(resolve, reject).finally(() => {
                this.runingCount--;
                this.#run();
            })
        }
    }
}

const suerTask = new SuerTask();

function addTask(time, name) {
    suerTask
        .add(() => delay(time))
        .then(() => {
            console.log(`任务${name}完成`)
        })
}


addTask(10000, 1);
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
addTask(5000, 5);