<script setup lang="ts">
import { onActivated } from 'vue';

window.console.log('setup');

onActivated(() => {
  window.console.log('onActivated');
});
</script>

<template>
  <LookForward />
</template>

<style scoped></style>
