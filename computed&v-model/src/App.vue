<script setup>
import { ref } from 'vue';
import Input from './components/input.vue'
const from = ref({
  place:'请填写你需要填写的信息',
  value:''
})
const value = ref('')
</script>

<template>
 <Input v-model="from"/>
</template>

<style scoped>

</style>
