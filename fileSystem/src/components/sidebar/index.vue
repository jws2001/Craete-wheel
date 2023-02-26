<template>
    <div class="sidebar-container">
        <template v-if="!isFile">
            <p class="no-open-file-title">尚未打开文件夹。</p>
            <div class="open-fiel-btn" @click="handleOpenFile">打开文件夹</div>
        </template>
        <Tree v-else :data="fileList" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Tree from '@/components/tree/index.vue'
type TreeData = {
    name: string;
    children: TreeData[];
    kind: string;
}
const fileList = ref<TreeData>({
    name: '',
    children: [],
    kind: '',
});
// 是否选择文件
const isFile = ref(false);
const handleOpenFile = async () => {
    try {
        const directory = await window.showDirectoryPicker();
        const result = await processHandle(directory);
        fileList.value = result as TreeData;
        isFile.value = true;
    } catch (err) {
        console.log(err)
    }
}

// 句柄处理函数
async function processHandle(handleData: any) {
    if (handleData.kind === 'file') {
        // 文件不在读取
        return handleData;
    }
    // 保存子文件
    handleData.children = [];
    // 文件迭代器
    const iter = handleData.entries();
    for await (const item of iter) {
        handleData.children.push(await processHandle(item[1]))
    }
    return handleData;
}
</script>

<style lang="scss" scoped>
.sidebar-container {
    padding: 20px 10px;
    font-size: 13px;
    user-select: none;
}

.no-open-file-title {
    color: rgb(204, 204, 204);
    line-height: 18.2px;
    margin-bottom: 13px;
}

.open-fiel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    height: 28px;
    padding: 4px;
    background-color: rgb(14, 99, 156);
    margin: 0 auto;

    &:hover {
        background-color: #1177bb;
        cursor: pointer;
    }
}
</style>