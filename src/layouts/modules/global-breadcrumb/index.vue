<script setup lang="ts">
import type { RouteKey } from '@elegant-router/types';
import { useThemeStore } from '@/store/modules/theme';
import { useRouteStore } from '@/store/modules/route';
import { useRouterPush } from '@/hooks/common/router';
import { ArrowRight } from '@element-plus/icons-vue';
import { ElDropdown } from 'element-plus';
defineOptions({
  name: 'GlobalBreadcrumb'
});

const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKey } = useRouterPush();

function handleClickMenu(key: RouteKey) {
  routerPushByKey(key);
}
</script>

<template>
  <ElBreadcrumb v-if="themeStore.header.breadcrumb.visible" :separator-icon="ArrowRight">
    <ElBreadcrumbItem v-for="item in routeStore.breadcrumbs" :key="item.key">
      <ElDropdown v-if="item.options?.length">
        <ElButton text :icon="themeStore.header.breadcrumb.showIcon ? item.icon : ''">
          {{ item.label }}
        </ElButton>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem v-for="option in item.options" :key="option.key" @click="handleClickMenu(option.routeKey)">
              {{ option.label }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
      <ElButton v-else text bg :icon="themeStore.header.breadcrumb.showIcon ? item.icon : ''" class="!cursor-default">
        {{ item.label }}
      </ElButton>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style scoped></style>
