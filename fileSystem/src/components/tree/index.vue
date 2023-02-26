<template>
    <div class="tree-container">
        <div class="name" @click="showUnfold">
            <Icon :type="!isUnfold ? 'icon-youjiantou' : 'icon-xiajiantou'" v-if="props.data.kind === 'directory'"
                :size="16" />
            <span class="title">{{ props.data.name }}</span>
        </div>
        <div class="children" v-if="props.data.kind === 'directory'" v-show="isUnfold">
            <Tree v-for="data in props.data.children" :data="data" />
        </div>
    </div>
</template>

<script lang='ts'>
export default {
    name: "Tree"
}
</script>
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import Icon from '@/components/icon/Index.vue'
import storeFileContent from '@/store/fileContent'
type dataType = {
    [x: string]: any;
    name: string;
    children?: dataType[];
    kind: string;
}
interface TreeData {
    data: dataType
}
const props = defineProps<TreeData>();

const fileContent = storeFileContent();

// 是否展开
const isUnfold = ref(false);
const showUnfold = async () => {
    if (props.data.kind === 'directory') {
        // 点击的是目录
        isUnfold.value = !isUnfold.value;
        return;
    }
    // 点击的是文件
    fileContent.fielContentList = await props.data.getFile()
}

</script>

<style scoped lang="scss">
.name {
    // display: flex;
    align-items: center;
    height: 22px;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    .title {
        font-size: 13px;
        color: rgb(204, 204, 204);
    }

    &:hover {
        background-color: #37373d;
    }
}

.children {
    padding-left: 15px;
}
</style>