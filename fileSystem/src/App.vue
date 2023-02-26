

<template>
    <Layout>
        <template v-slot:menu>
            <Menu />
        </template>
        <template v-slot:aside>
            <Sidebar />
        </template>
        <Content />
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/index.vue';
import Menu from '@/components/menu/index.vue';
import Sidebar from '@/components/sidebar/index.vue';
import Content from '@/components/content/index.vue'
// 处理目录
async function processHandle(handle: any) {
    if (handle.kind === 'file') {
        // 文件直接返回
        return handle;
    }
    // 是目录
    handle.children = [];

    // 得到一个 异步迭代器
    const iter = handle.entries();
    // 循环得到文件里面的内容
    for await (const item of iter) {
        handle.children.push(await processHandle(item[1]))
    }
    return handle;
}
const handleClick = async () => {
    try {
        // showDirectoryPicker
        const directory = await window.showDirectoryPicker();
        const root = await processHandle(directory);
        console.log(root)
    } catch (err) {

    }
}
</script>

<style scoped></style>
