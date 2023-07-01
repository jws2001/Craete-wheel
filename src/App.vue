<script setup lang="ts">
import { useDebouncedRef } from './utils';

const text = useDebouncedRef('');
</script>

<template>
  <input type="text"  value="1">
<div>{{ text }}</div>  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
