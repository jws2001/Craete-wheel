const restart = () => {
    const btn = document.querySelector('.restart');
    btn.addEventListener('click', () => {
        const result = window.confirm('确定重新开始?')
        if (result) {
            location.reload()
        }
    })
}


export default restart