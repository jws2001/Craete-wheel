<template>
    <div class="menu-container">
        <div class="file-icon item" @click="handleFileIconClick">
            <Icon type="icon-file" :size="30"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/icon/Index.vue';
import isAsideUnfold from '@/store/isAsideUnfold';
const asideWidth = isAsideUnfold();
const handleFileIconClick = () => {
    asideWidth.value = !asideWidth.value;
}
</script>

<style lang="scss" scoped>
.menu-container{
    width: 100%;
    height: 100%;
    text-align: center;
}
.item{
    cursor: pointer;
    padding: 10px 0;
    color: rgba(255, 255, 255, 0.4);
    &:hover{
        color: #fff;
    }
}
</style>