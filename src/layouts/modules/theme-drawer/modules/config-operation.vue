<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Clipboard from 'clipboard';
import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'ConfigOperation'
});

const themeStore = useThemeStore();

const domRef = ref<HTMLElement | null>(null);

function initClipboard() {
  if (!domRef.value) return;
  const clipboard = new Clipboard(domRef.value, {
    text: () => getClipboardText()
  });

  clipboard.on('success', () => {
    // window.$message?.success($t('theme.configOperation.copySuccessMsg'));
  });
}

function getClipboardText() {
  const reg = /"\w+":/g;

  const json = themeStore.settingsJson;
  return json.replace(reg, match => match.replace(/"/g, ''));
}

function handleReset() {
  themeStore.resetStore();

  setTimeout(() => {
    // window.$message?.success($t('theme.configOperation.resetSuccessMsg'));
  }, 50);
}

onMounted(() => {
  initClipboard();
});
</script>

<template>
  <div class="flex justify-between w-full">
    <ElButton type="danger" plain @click="handleReset">{{ $t('theme.configOperation.resetConfig') }}</ElButton>
    <div ref="domRef">
      <ElButton type="primary" plain>{{ $t('theme.configOperation.copyConfig') }}</ElButton>
    </div>
  </div>
</template>

<style scoped></style>
