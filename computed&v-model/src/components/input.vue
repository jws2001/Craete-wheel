<template>
    <input type="text" v-model="cupModelValue.value" :placeholder="props.modelValue.place">
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const cupModelValue = useVModel(props, 'modelValue', emit)

function useVModel(props, propName, emit) {
    return computed({
        get() {
            return new Proxy(props[propName], {
                set(obj, name, val){
                    emit(`update:${propName}`, {
                        ...obj,
                        [name]:val
                    })
                    return true
                }
            })
        }
    })
}
</script>

<style lang="scss" scoped></style>