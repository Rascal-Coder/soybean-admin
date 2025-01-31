<template>
  <SimpleScrollbar>
    <ElMenu
      id="theme-menu"
      :default-active="$route.path"
      :mode="mode"
      :collapse="siderCollapse"
      :style="[menuHeightStyle, darkTheme ? invertedStyle : null]"
      class="!transition-400 !border-r-0"
      :collapse-transition="false"
      :unique-opened="uniqueOpened"
      router
    >
      <BaseMenuItem v-for="menu in EleMenus" :key="menu.key" :item="menu"></BaseMenuItem>
    </ElMenu>
  </SimpleScrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SimpleScrollbar } from '@sa/materials';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import BaseMenuItem from './base-menu-item.vue';
import { darken } from '@sa/utils';
defineOptions({
  name: 'BaseMenu'
});

interface Props {
  darkTheme?: boolean;
  mode?: 'horizontal' | 'vertical';
  menus: App.Global.Menu[];
  uniqueOpened?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical',
  uniqueOpened: false
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const EleMenus = computed(() => props.menus);
const isHorizontal = computed(() => props.mode === 'horizontal');

const siderCollapse = computed(() => themeStore.layout.mode === 'vertical' && appStore.siderCollapse);

const menuHeightStyle = computed(() => {
  return isHorizontal.value ? { '--el-menu-horizontal-height': `${themeStore.header.height}px` } : {};
});

const { primary } = themeStore.themeColors;
// 设置菜单反转色
const invertedStyle = computed(() => {
  return {
    '--el-menu-text-color': '#e5eaf3',
    '--el-menu-bg-color': 'transparent',
    '--el-menu-hover-bg-color': darken(primary, 9 / 10),
    '--el-menu-item-hover-fill': darken(primary, 9 / 10),
    '--el-menu-hover-text-color': darken(primary),
    '--el-menu-active-color': darken(primary)
  };
});
</script>
<style lang="scss" scoped></style>
