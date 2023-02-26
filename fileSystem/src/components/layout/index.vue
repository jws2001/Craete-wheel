<template>
    <div class="layout-container">
        <div class="menu">
            <slot name="menu"></slot>
        </div>
        <div class="content">
            <aside id="aside">
                <slot name="aside"></slot>
                <div class="col" @mousedown="handleColDown"></div>
            </aside>
            <main id="main">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import isAsideUnfold from '@/store/isAsideUnfold';
// 菜单栏宽度
const asideWidth = ref<number>(200);
// 侧边拦最小宽度
const minAsideWidth = 150;
const asideWidthPx = computed(() => `${asideWidth.value}px`);

// 记录拖动条按下的位置信息
let startcLientX: number = 0;
let currentAsideWidth: number = asideWidth.value;
const handleDocumentMove = (e: MouseEvent) => {
    const { clientX } = e;
    let newAsideWidth = currentAsideWidth + (clientX - startcLientX);
    if (newAsideWidth <= minAsideWidth) {
        if (newAsideWidth < minAsideWidth / 2) {
            // 拖动小于 最小宽度的一半 直接隐藏
            newAsideWidth = 0
        } else {
            newAsideWidth = minAsideWidth;
        }
    }
    // 不能低于最小宽度
    asideWidth.value = newAsideWidth;
}
const handleColDown = (e: MouseEvent) => {
    const { clientX } = e;
    // 记录按下 x
    startcLientX = clientX;
    // 记录按下当前的侧边栏 width
    currentAsideWidth = asideWidth.value;
    document.addEventListener('mousemove', handleDocumentMove)
}

document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleDocumentMove)
})


const isAsideUnfoldStore = isAsideUnfold();
watchEffect(() => {
    if(isAsideUnfoldStore.value){
        asideWidth.value = currentAsideWidth;
    }else{
        asideWidth.value = 0;
    }
})

</script>

<style lang="scss" scoped>
.layout-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgb(30, 30, 30);

    .iconfont {
        width: 100%;
    }

    .menu {
        width: 50px;
        flex-grow: 0;
        flex-shrink: 0;
        background-color: rgb(51, 51, 51);
    }

    .content {
        display: flex;
        flex-grow: 1;
        #aside {
            // min-width: 150px;
            width: v-bind(asideWidthPx);
            background-color: rgb(37, 37, 38);
            position: relative;
            overflow: hidden;
            .col {
                position: absolute;
                height: 100%;
                width: 5px;
                top: 0;
                right: 0;
                background-color: #3794ff;
                opacity: 0;
                transition: opacity .3s;
                &:hover {
                    opacity: 1;
                    cursor: col-resize;
                }
            }
        }

        #main {
            flex-grow: 1;
        }
    }
}
</style>