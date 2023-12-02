<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import type { RouteKey } from '@elegant-router/types';
import { useThemeStore } from '@/store/modules/theme';
import { useRouteStore } from '@/store/modules/route';
import { useRouterPush } from '@/hooks/common/router';
import { ArrowRight } from '@element-plus/icons-vue';
import { ElDropdown } from 'element-plus';
defineOptions({
  name: 'GlobalBreadcrumb'
});
interface BreadcrumbContentProps {
  breadcrumb: App.Global.Menu;
}
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKey } = useRouterPush();
const [DefineBreadcrumbContent, BreadcrumbContent] = createReusableTemplate<BreadcrumbContentProps>();
function handleClickMenu(key: RouteKey) {
  routerPushByKey(key);
}
</script>

<template>
  <ElBreadcrumb v-if="themeStore.header.breadcrumb.visible" :separator-icon="ArrowRight">
    <!-- define component: BreadcrumbContent -->
    <DefineBreadcrumbContent v-slot="{ breadcrumb }">
      <ElButton text :icon="themeStore.header.breadcrumb.showIcon ? breadcrumb.icon : ''">
        {{ breadcrumb.label }}
      </ElButton>
    </DefineBreadcrumbContent>
    <!-- define component: BreadcrumbContent -->
    <ElBreadcrumbItem v-for="item in routeStore.breadcrumbs" :key="item.key">
      <ElDropdown v-if="item.options?.length" @command="handleClickMenu">
        <BreadcrumbContent :breadcrumb="item" />
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem
              v-for="option in item.options"
              :key="option.key"
              :command="option.key"
              :icon="themeStore.header.breadcrumb.showIcon ? option.icon : ''"
            >
              {{ option.label }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
      <BreadcrumbContent v-else :breadcrumb="item" bg />
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style scoped></style>
