<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue';
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
const TAB_DATA_ID = 'data-tab-id';

type TabNamedNodeMap = NamedNodeMap & {
  [TAB_DATA_ID]: Attr;
};
async function scrollToActiveTab() {
  await nextTick();
  if (!tabRef.value) return;
  const elDropdownRef = tabRef.value.children[0];
  const { children: tabs } = elDropdownRef;
  for (let i = 0; i < tabs.length; i += 1) {
    const child = tabs[i];
    const { value: tabId } = (child.attributes as TabNamedNodeMap)[TAB_DATA_ID];
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

interface DropdownConfig {
  visible: boolean;
  tabId: string;
}

const dropdown: DropdownConfig = reactive({
  visible: false,
  tabId: ''
});

function setDropdown(config: Partial<DropdownConfig>) {
  Object.assign(dropdown, config);
}
let isClickContextMenu = false;

async function handleContextMenu(e: MouseEvent, tabId: string) {
  e.preventDefault();

  const DURATION = dropdown.visible ? 150 : 0;

  setDropdown({ visible: false });

  setTimeout(() => {
    setDropdown({
      visible: true,
      tabId
    });
    isClickContextMenu = false;
  }, DURATION);
}

function handleDropdownVisible(visible: boolean) {
  if (!isClickContextMenu) {
    setDropdown({ visible });
  }
}
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
            class="flex h-full pr-18px transition-400"
            :class="[themeStore.tab.mode === 'chrome' ? 'items-end' : 'items-center gap-12px']"
          >
            <ContextMenu
              v-for="tab in tabStore.tabs"
              :key="tab.id"
              :visible="dropdown.visible"
              :tab-id="dropdown.tabId"
              :disabled-keys="getContextMenuDisabledKeys(dropdown.tabId)"
              @update:visible="handleDropdownVisible"
            >
              <PageTab
                :[TAB_DATA_ID]="tab.id"
                :mode="themeStore.tab.mode"
                :dark-mode="themeStore.darkMode"
                :active="tab.id === tabStore.activeTabId"
                :active-color="themeStore.themeColor"
                :closable="!tabStore.isTabRetain(tab.id)"
                @click="tabStore.switchRouteByTab(tab)"
                @close="handleCloseTab(tab)"
                @contextmenu="handleContextMenu($event, tab.id)"
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
