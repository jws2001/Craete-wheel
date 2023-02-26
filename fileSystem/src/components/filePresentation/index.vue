<template>
    <div class="file-presentation-container">
        <pre><code ref="code">{{ file }}</code></pre>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect, getCurrentInstance, nextTick } from 'vue'
import hljs from 'highlight.js'
const props = defineProps<{
    file: string
}>()

const file = ref<string | ArrayBuffer>('');
const _this = getCurrentInstance();
watchEffect(() => {
    if (!props.file) return;
    const reader = new FileReader();
    reader.addEventListener('load', e => {
        if (e.target?.result) {
            file.value = e.target?.result;
            nextTick(() => {
                if (_this) {
                    const el = _this.refs.code;
                    console.log(el)
                    hljs.highlightElement(el as HTMLElement);

                }
            })
        }
    })
    reader.readAsText(props.file as unknown as Blob, 'UTF-8')
})
</script>

<style lang="scss" scoped>
.file-presentation-container {
    height: 100%;
    overflow: auto;
    font-size: 12px;

    pre {
        line-height: 18px;

        code {
            background-color: transparent;
        }
    }
}
</style>