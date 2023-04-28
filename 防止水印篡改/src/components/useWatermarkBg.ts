import { computed } from 'vue'
import { propsType } from './types.ts'


export default function (props: Readonly<propsType>) {
    return computed(() => {
        // 创建一个canvas
        const canvas = document.createElement('canvas');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const fontSize = props.fontSize * devicePixelRatio;
    })
}