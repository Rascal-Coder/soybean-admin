<template>
  <BaseIframe :src="src"></BaseIframe>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const src = ref('https://cn.vitejs.dev/');
</script>

<style scoped></style>
