<!--
 * @Author: qi yuhang qiyuhang@thinkerx.com
 * @Date: 2023-12-01 10:38:04
 * @LastEditors: qi yuhang qiyuhang@thinkerx.com
 * @LastEditTime: 2023-12-05 16:33:26
 * @FilePath: \soybean-admin\src\layouts\modules\theme-drawer\modules\config-operation.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    window.$message?.success($t('theme.configOperation.copySuccessMsg'));
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
    window.$message?.success($t('theme.configOperation.resetSuccessMsg'));
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
