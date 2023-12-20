import Draw from "./draw.js";

const drawDom = document.querySelector('.draw');
const draw = new Draw(drawDom, 'https://img-mall-test.sjgo365.com/cbest-mall-center/images/20230712/SbA6XxUVeIiJ5yR2jawHPo3xE9Hk1iz35ZxOaxbe.png');


const fun = () => {
    console.log('超出限制')
}

draw.addEventListener('limit', fun)

draw.addEventListener('change', e => {
    console.log(e,'===')
})
