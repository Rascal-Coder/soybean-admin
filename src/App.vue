<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAppStore } from './store/modules/app';
import { elementPlusLang } from './locales/element-plus';
import { cssUrls, jsUrls } from '@/constants/cdn';
import { loadCss, loadJs } from '@/utils/common';
defineOptions({
  name: 'App'
});

const appStore = useAppStore();

const eleLocale = computed(() => {
  return elementPlusLang[appStore.locale];
});
function iconfontInit() {
  if (cssUrls.length > 0) {
    cssUrls.map(v => loadCss(v));
  }

  if (jsUrls.length > 0) {
    jsUrls.map(v => loadJs(v));
  }
}
onMounted(() => {
  iconfontInit();
});
</script>

<template>
  <ElConfigProvider :locale="eleLocale">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>
