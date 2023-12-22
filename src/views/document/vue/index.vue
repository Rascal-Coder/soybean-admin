<template>
  <BaseIframe :src="src"></BaseIframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const src = ref('https://v3.cn.vuejs.org/');
</script>

<style scoped></style>
