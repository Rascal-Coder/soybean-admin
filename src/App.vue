<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from './store/modules/app';
import { elementPlusLang } from './locales/element-plus';

defineOptions({
  name: 'App'
});

const appStore = useAppStore();

const eleLocale = computed(() => {
  return elementPlusLang[appStore.locale];
});
</script>

<template>
  <el-config-provider :locale="eleLocale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
