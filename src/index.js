const wrapper = document.querySelector('#tai-ji');
class MyTaiJi extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow( { mode: 'open' } );
        shadow.appendChild(wrapper.content.cloneNode(true));
    }
}

customElements.define('my-tai-ji', MyTaiJi);