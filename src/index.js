let activeEffect = null;
const observerStore = new WeakMap();
const observer = (obj) => {
    return new Proxy(obj, {
        get(target, key) {
            if(!activeEffect) return
            const vlaue = target[key];
            let depsMap = observerStore.get(target)
            if(!depsMap){
                depsMap = new Map();
                observerStore.set(target, depsMap)
            }
            let deps = depsMap.get(key);
            if(!deps){
                deps = new Set();
                depsMap.set(key, deps)
            }
            deps.add(activeEffect);
            return vlaue // 返回值
        },
        set(target, key, newValue) {
            const depsMap = observerStore.get(target);
            target[key] = newValue;
            if(!depsMap) return;
            depsMap.get(key).forEach(effect => effect())
        }
    })
}


const $app = document.querySelector('#app')

let state = observer({
    text: 'hello fatfish'
})


const effect = (fn) => {
    activeEffect = fn
    fn();
}

effect(() => {
    $app.innerText = state.text
})


setTimeout(() => {
    // 1秒后希望app的内容变成hello Vue3
    state.text = 'hello Vue3'
}, 1000)