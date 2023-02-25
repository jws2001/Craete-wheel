<template>
    <div class="layout-container">
        <div class="menu">菜单栏</div>
        <div class="content">
            <aside id="aside">
                <slot name="aside"></slot>
            </aside>
            <main id="main">
                <slot></slot>
            </main> 
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.layout-container{
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgb(30, 30, 30);
    .menu{
        width: 50px;
        border: 1px solid red;
        flex-grow: 0;
        flex-shrink: 0;
    }
}
</style>