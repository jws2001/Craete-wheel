const deng = (durations) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, durations * 1000);
    })
}

const arrange = (name) => {
    let notify = () => console.log(`${name} is notified`);
    let commit = () => console.log(`Start to ${name}`);

    const task = [];

    task.push(() => {
        return notify(name)
    })


    return {
        wait(time) {
            task.push(async () => {
                return await deng(time);
            });
            return this;
        },
        do(name) {
            task.push(async () => {
                return commit(name)
            })
            return this
        },
        awitFirst(time) {
            task.unshift(async () => {
                return await deng(time)
            })
            return this
        },
        async execute() {
            let i = 0, len = task.length;
            while (i < len) {
                await task[i]();
                i++;
            }

            task.length = 0;
        }
    }
}



arrange('william')
    .wait(5)
    .do('commit')
    .awitFirst(3)
    .execute();

// 等待3秒
// > william is notified
// 等待5秒
// Start to commit