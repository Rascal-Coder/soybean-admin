<template>
  <template v-if="!item?.children">
    <ElMenuItem :index="item.routePath">
      <component :is="item.icon"></component>
      <template #title>
        <span class="truncate">{{ item.i18nKey ? $t(item.i18nKey) : item.label }}</span>
      </template>
    </ElMenuItem>
  </template>
  <ElSubMenu v-else :index="item.routePath">
    <template #title>
      <component :is="item.icon"></component>
      <span class="truncate">{{ item.i18nKey ? $t(item.i18nKey) : item.label }}</span>
    </template>
    <BaseMenuItem v-for="child in item.children" :key="child.key" :item="child" />
  </ElSubMenu>
</template>

<script lang="ts" setup>
import { $t } from '@/locales';
interface Props {
  item: App.Global.Menu;
}
defineProps<Props>();
</script>

<style scoped lang="scss"></style>
