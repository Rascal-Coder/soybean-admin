<script setup lang="ts">
import { useThemeStore } from '@/store/modules/theme';
defineOptions({
  name: 'GlobalFooter'
});

const themeStore = useThemeStore();
</script>

<template>
  <DarkModeContainer class="flex-center h-full">
    <div>
      <span>Copyright</span>
      <span class="mx-1">©</span>
      <span>{{ themeStore.footer.dates }}</span>
      <a class="ml-1 cursor-pointer" target="_blank" rel="noopener" :href="themeStore.footer.website">
        {{ themeStore.footer.company }}
      </a>
    </div>
  </DarkModeContainer>
</template>

<style scoped></style>
