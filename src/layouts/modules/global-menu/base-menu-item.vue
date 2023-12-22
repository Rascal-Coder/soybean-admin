<template>
  <ElMenuItem
    v-if="!item?.children"
    :index="item.routePath"
    :title="item.i18nKey ? $t(item.i18nKey) : item.label"
    @click="handleMenuClick(item)"
  >
    <component :is="item.icon" class="mr-2"></component>
    <template #title>
      <span class="truncate">
        {{ item.i18nKey ? $t(item.i18nKey) : item.label }}
      </span>
    </template>
  </ElMenuItem>
  <ElSubMenu v-else :index="item.routePath" :title="item.i18nKey ? $t(item.i18nKey) : item.label">
    <template #title>
      <component :is="item.icon" class="mr-2"></component>
      <span class="truncate">
        {{ item.i18nKey ? $t(item.i18nKey) : item.label }}
      </span>
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
const isLinkStayCurrrent = import.meta.env.VITE_OUT_LINK_STAY_CURRENT === 'Y';
function handleMenuClick(val: App.Global.Menu) {
  if (!isLinkStayCurrrent && val.meta?.href) {
    window.open(val.meta?.href);
  }
}
</script>

<style scoped lang="scss"></style>
