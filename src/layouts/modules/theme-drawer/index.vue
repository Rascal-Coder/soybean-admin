<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';
import DarkMode from './modules/dark-mode.vue';
import LayoutMode from './modules/layout-mode.vue';
import ThemeColor from './modules/theme-color.vue';
import PageFun from './modules/page-fun.vue';
import ConfigOperation from './modules/config-operation.vue';

defineOptions({
  name: 'ThemeDrawer'
});

const appStore = useAppStore();
</script>

<template>
  <ElDrawer id="theme-drawer" v-model="appStore.themeDrawerVisible" append-to-body>
    <template #header>
      <h4>{{ $t('theme.themeDrawerTitle') }}</h4>
    </template>
    <DarkMode />
    <LayoutMode />
    <ThemeColor />
    <PageFun />
    <template #footer>
      <ConfigOperation />
    </template>
  </ElDrawer>
</template>

<style lang="scss">
#theme-drawer {
  .el-drawer__header {
    padding: var(--el-drawer-padding-primary) !important;
    border-bottom: 1px var(--el-border-color) var(--el-border-style) !important;
    margin: 0px;
  }
}
</style>
