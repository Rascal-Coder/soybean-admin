<script setup lang="ts">
import type { VNodeRef } from 'vue';
import { ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useElementBounding, useResizeObserver, useDebounceFn } from '@vueuse/core';
import { PageTab } from '@sa/materials';
import BetterScroll from '@/components/custom/better-scroll.vue';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useRouteStore } from '@/store/modules/route';
import { useTabStore } from '@/store/modules/tab';
import ContextMenu from './context-menu.vue';
defineOptions({
  name: 'GlobalTab'
});
interface ContextMenuRef {
  close(): void;
}

const route = useRoute();
const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const tabStore = useTabStore();
const showArrow = ref(false);
const bsWrapper = ref<HTMLElement>();
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper);
const bsScroll = ref<InstanceType<typeof BetterScroll>>();
const tabRef = ref<HTMLElement>();
const contextMenuRefList = ref<ContextMenuRef[]>([]);
const TAB_DATA_ID = 'data-tab-id';

type TabNamedNodeMap = NamedNodeMap & {
  [TAB_DATA_ID]: Attr;
};
async function scrollToActiveTab() {
  await nextTick();
  if (!tabRef.value) return;

  const elDropdownRefList = tabRef.value.children;
  for (let i = 0; i < elDropdownRefList.length; i += 1) {
    const child = elDropdownRefList[i];
    const { children: tab } = child;
    const { value: tabId } = (tab[0].attributes as TabNamedNodeMap)[TAB_DATA_ID];
    if (tabId === tabStore.activeTabId) {
      const { left, width } = child.getBoundingClientRect();
      const clientX = left + width / 2;
      setTimeout(() => {
        scrollByClientX(clientX);
      }, 50);

      break;
    }
  }
}

function scrollByClientX(clientX: number) {
  if (bsScroll.value?.instance) {
    const { maxScrollX, x: leftX, scrollBy, wrapper, content } = bsScroll.value.instance!;
    showArrow.value = content?.offsetWidth >= wrapper?.offsetWidth;
    const currentX = clientX - bsWrapperLeft.value;
    const deltaX = currentX - bsWrapperWidth.value / 2;
    const rightX = maxScrollX - leftX;
    const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
    scrollBy(update, 0, 300);
  }
}
function getContextMenuDisabledKeys(tabId: string) {
  const disabledKeys: App.Global.DropdownKey[] = [];
  // 禁止关闭当前
  if (tabStore.isTabRetain(tabId)) {
    disabledKeys.push('closeCurrent');
  }

  return disabledKeys;
}

async function handleCloseTab(tab: App.Global.Tab) {
  await tabStore.removeTab(tab.id);
  await routeStore.reCacheRoutesByKey(tab.routeKey);
}

async function refresh() {
  appStore.reloadPage(500);
}

const setContextMenuRefList: VNodeRef = el => {
  if (el) {
    contextMenuRefList.value.push(el as unknown as ContextMenuRef);
  }
};
function init() {
  tabStore.initTabStore(route);
}

// watch
watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route);
  }
);
watch(
  () => tabStore.activeTabId,
  () => {
    scrollToActiveTab();
  }
);

// useResizeObserver
useResizeObserver(
  bsScroll,
  useDebounceFn(() => {
    scrollToActiveTab();
  }, 200)
);
const handleCloseTagAction = () => {
  contextMenuRefList.value.forEach(item => {
    item?.close();
  });
};
// init
init();
</script>

<template>
  <DarkModeContainer class="flex-y-center wh-full px-16px shadow-tab">
    <div ref="bsWrapper" class="h-full flex-1 flex-1-hidden">
      <BetterScroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: appStore.isMobile }">
        <template #conent>
          <div
            ref="tabRef"
            class="flex h-full pr-18px"
            :class="[themeStore.tab.mode === 'chrome' ? 'items-end' : 'items-center gap-12px']"
          >
            <ContextMenu
              v-for="tab in tabStore.tabs"
              :key="tab.id"
              :ref="setContextMenuRefList"
              :tab-id="tab.id"
              :disabled-keys="getContextMenuDisabledKeys(tab.id)"
              @close-all="handleCloseTagAction"
            >
              <PageTab
                :[TAB_DATA_ID]="tab.id"
                :tab-id="tab.id"
                :mode="themeStore.tab.mode"
                :dark-mode="themeStore.darkMode"
                :active="tab.id === tabStore.activeTabId"
                :active-color="themeStore.themeColor"
                :closable="!tabStore.isTabRetain(tab.id)"
                @click="tabStore.switchRouteByTab(tab)"
                @close="handleCloseTab(tab)"
              >
                <template #prefix>
                  <SvgIcon
                    :icon="tab.icon"
                    :local-icon="tab.localIcon"
                    class="inline-block align-text-bottom text-16px"
                  />
                </template>
                {{ tab.label }}
              </PageTab>
            </ContextMenu>
          </div>
        </template>
      </BetterScroll>
    </div>
    <ReloadButton :loading="!appStore.reloadFlag" @click="refresh" />
    <FullScreen :full="appStore.fullContent" @click="appStore.toggleFullContent" />
  </DarkModeContainer>
</template>

<style scoped></style>
