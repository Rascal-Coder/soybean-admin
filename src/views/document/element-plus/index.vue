<template>
  <BaseIframe :src="src"></BaseIframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const src = ref('https://element-plus.gitee.io/zh-CN/');
</script>

<style scoped></style>
