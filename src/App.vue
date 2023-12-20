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
  <ElConfigProvider :locale="eleLocale">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
