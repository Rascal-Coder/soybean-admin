<template>
  <div>
    <ElCalendar v-model="value" />
    <div>
      <el-button v-for="(item, index) in loadingList" :key="item" type="primary" @click="startLoading(item)">
        loading{{ index + 1 }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const value = ref(new Date());
import { useLoading } from '@/hooks/useLoading';
const loadingList = ref(['loading', 'pulse', 'rect', 'plane', 'cube', 'preloader', 'chase', 'dot']);

const startLoading = (item: any) => {
  const { open, close } = useLoading({ spin: item });
  open();
  setTimeout(() => {
    close();
  }, 2000);
};
</script>
