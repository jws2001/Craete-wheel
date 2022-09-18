(() => {
    const analysisTemplateString = stringArr => {
        const sys = 'jws$$jws';
        //解析字符串
        let tempStr = stringArr[0].join(sys).replace(/\s+/g,'');
        //获取表达式参数
        const par = stringArr.slice(1);
        //判断有参数
        if(par.length){
            let index = 0;
            tempStr = tempStr.replace(/jws\$\$jws/g,() => par[index ++]) 
        }
        return tempStr.split(';').filter(item => item !== '').map(item => item.split(':'))
    }
    HTMLElement.prototype.setStyles = function(...arg){
       const param = analysisTemplateString(arg)
       param.forEach(item => {
        this.style[item[0]] = item[1]
       })
       return this;
    }
    HTMLElement.prototype.setContent = function (content) {
        this.innerText = content;
        return this
    }
})()