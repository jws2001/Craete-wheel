<template>
    <i class="iconfont" :class="props.type"></i>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
const props = withDefaults(defineProps<{
    type: string,
    size: number
}>(), {
    size: 20
})
const size = computed(() => `${props.size}px`)
</script>

<style lang="scss" scoped>
.iconfont {
    font-size: v-bind(size);
}
</style>