<template>
    <div class="watermark-container">
        <slot></slot>
        在这里添加一个div,填充满整个区域
        <div></div>
    </div>
</template>

<script setup lang="ts">
import useWatermarkBg from './useWatermarkBg'

const props = withDefaults(defineProps<{
    readonly text:string
    readonly fontSize:number
    readonly gap:number
}>(),{
    text:'Watermark',
    fontSize:40,
    gap:20
})

const bg = useWatermarkBg(props);
console.log(bg)
</script>

<style scoped lang="less">
.watermark-container {}
</style>