<template>
  <template v-if="!item?.children">
    <el-menu-item :index="item.routePath">
      <component :is="item.icon"></component>
      <template #title>
        <span>{{ item.i18nKey ? $t(item.i18nKey) : item.label }}</span>
      </template>
    </el-menu-item>
  </template>
  <el-sub-menu v-else :index="item.routePath">
    <template #title>
      <component :is="item.icon"></component>
      <span>{{ item.i18nKey ? $t(item.i18nKey) : item.label }}</span>
    </template>
    <BaseMenuItem v-for="child in item.children" :key="child.key" :item="child" />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { $t } from '@/locales';
interface Props {
  item: App.Global.Menu;
}
defineProps<Props>();
</script>

<style scoped lang="scss"></style>
