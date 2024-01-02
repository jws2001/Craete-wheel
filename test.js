const timeout = duration => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}


class SuperTask {
    constructor(size) {
        // 并行任务数
        this.size = size;
        this.runSize = 0;
        this.queue = [];
    }
    add(task) {
        return new Promise((resolve, reject) => {
            // 添加任务
            this.queue.push({
                task,
                resolve,
                reject
            });
            this._run();
        })
    }

    _run() {
        while (this.runSize < this.size && this.queue.length) {
            const { task, resolve, reject } = this.queue.shift();
            this.runSize++;
            Promise.resolve(task()).then(resolve, reject).finally(() => {
                this.runSize--;
                this._run();
            })
        }
    }
}

const superTask = new SuperTask(1);

const addTask = (time, name) => {
    superTask.add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}完成`)
        })
}


addTask(3000, 1);  

addTask(2000, 2); 

addTask(1000, 3); 


addTask(3000, 4); 
addTask(1000, 5); 