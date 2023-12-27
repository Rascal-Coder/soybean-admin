<template>
  <div>
    <base-box
      v-sa-loading="loading"
      title="指令方式加载loading"
      class="relative"
      height="150px"
      loading-text="自定义指令loading"
      loading-spin="pulse"
      :loading-full="full"
    >
      <ElButton type="primary" @click="startCustomLoading(1)">v-sa-loading指令非全屏</ElButton>
      <ElButton type="primary" @click="startCustomLoading(2)">v-sa-loading指令全屏</ElButton>
    </base-box>
    <base-box title="hook加载loading">
      <ElButton v-for="(item, index) in loadingList" :key="item" type="primary" @click="startLoading(item)">
        loading{{ index + 1 }}
      </ElButton>
    </base-box>
    <base-box title="loading最小时长">
      <el-input-number v-model="time" class="mr-5" controls-position="right" />
      <ElButton type="primary" @click="startTimeLoading">点击触发loading</ElButton>
    </base-box>
  </div>
</template>

<script setup lang="ts">
import type { AnimationTypes } from '@/hooks';
import { useLoading } from '@/hooks';
import { ref } from 'vue';
const loading = ref(false);
const full = ref(false);

const time = ref(1000);
const loadingList = ref<AnimationTypes>(['loading', 'pulse', 'rect', 'plane', 'cube', 'preloader', 'chase', 'dot']);

const startCustomLoading = (val: number) => {
  full.value = val === 2;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const startLoading = (item: AnimationTypes[number]) => {
  const { open, close } = useLoading({ spin: item, minTime: time.value });
  open();
  setTimeout(() => {
    close();
  }, 2000);
};

const startTimeLoading = () => {
  const { open, close } = useLoading({ minTime: time.value });
  open();
  close();
};
</script>

<style scoped></style>
