import { defineStore } from 'pinia';

const isAsideUnfold = defineStore('isAsideUnfold', {
    state() {
        return {
            value: true
        }
    },
})

export default isAsideUnfold;