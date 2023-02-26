import { defineStore } from 'pinia';

type content = {
    fielContentList: string;
}

const fileContent = defineStore('fileContent', {
    state() {
        const data: content = {
            fielContentList: ''
        }
        return data
    },
})

export default fileContent