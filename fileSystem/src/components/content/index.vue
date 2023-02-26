<template>
    <div class="content-container">
        <FilePresentation :file="fileContent.fielContentList" />
    </div>
</template>

<script setup lang="ts">
import storeFileContent from '@/store/fileContent';
import FilePresentation from '@/components/filePresentation/index.vue'
const fileContent = storeFileContent();
</script>

<style scoped lang="scss">
.content-container {
    width: 100%;
    padding: 20px;
    height: 100%;
}
</style>