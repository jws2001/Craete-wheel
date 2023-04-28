<template>
    <div class="watermark-container">
        <slot></slot>

    </div>
</template>
    
<script setup lang='ts'>
import { watchEffect, withDefaults } from 'vue';
import useWatermarkBg from './useWatermarkBg.ts'
import { propsType } from './types.ts'
const props = withDefaults(defineProps<propsType>(), {
    text:() => '',
    fontSize:() => 40
})

const bg = useWatermarkBg(props)

watchEffect(() => {

})

</script>
    
<style>
.watermark-container {
    position: relative;
}
</style>