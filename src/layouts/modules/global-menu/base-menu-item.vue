<template>
  <template v-if="!item?.children">
    <ElMenuItem :index="item.routePath" :title="item.i18nKey ? $t(item.i18nKey) : item.label">
      <component :is="item.icon" class="mr-2"></component>
      <template #title>
        <span class="truncate">
          {{ item.i18nKey ? $t(item.i18nKey) : item.label }}
        </span>
      </template>
    </ElMenuItem>
  </template>
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
</script>

<style scoped lang="scss"></style>
