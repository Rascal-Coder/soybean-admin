<template>
  <div>
    <BaseBox title="指令方式加载loading" class="relative">
      <div v-ra-loading="loading" loading-loader="RotateSquare3" :loading-full="full">
        <ElButton type="primary" @click="startCustomLoading(0)">v-custom-loading指令非全屏</ElButton>
        <ElButton type="primary" @click="startCustomLoading(1)">v-custom-loading指令全屏</ElButton>
      </div>
    </BaseBox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const loading = ref(false);
const full = ref(false);
const startCustomLoading = (val: number) => {
  full.value = Boolean(val);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style scoped></style>
