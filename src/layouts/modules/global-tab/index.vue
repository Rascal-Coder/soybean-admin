<script setup lang="ts">
import { ref, reactive, watch, nextTick, computed } from 'vue';
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
const props = withDefaults(
  defineProps<{
    iconScroll?: boolean;
    distance?: number;
  }>(),
  {
    iconScroll: true,
    distance: 240
  }
);
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
// 根据这个去移动tab的位置
const tabBodyLeft = ref(0);

type TabNamedNodeMap = NamedNodeMap & {
  [TAB_DATA_ID]: Attr;
};
const initArrow = computed(() => {
  return showArrow.value && props.iconScroll;
});
/**
 * 向左 disabled
 */
const leftDisabled = computed(() => {
  return tabBodyLeft.value === 0;
});

/**
 * 向右 disabled
 */
const rightDisabled = computed(() => {
  let isDisabled = false;
  if (bsScroll.value?.instance) {
    const { wrapper, content } = bsScroll.value.instance!;
    isDisabled = tabBodyLeft.value <= wrapper?.offsetWidth - content?.offsetWidth;
  }
  return isDisabled;
});
async function scrollToActiveTab() {
  await nextTick();
  if (!tabRef.value) return;

  const { children } = tabRef.value;
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

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
/**
 * 滚动
 * @param  val
 */
const handleScroll = (val: number) => {
  if (bsScroll.value?.instance) {
    if (val > 0 && leftDisabled.value) {
      return;
    }
    if (val < 0 && rightDisabled.value) {
      return;
    }
    if (val > 0) {
      setBodyLeft(Math.min(0, tabBodyLeft.value + val));
    } else {
      const { wrapper, content } = bsScroll.value.instance!;
      setBodyLeft(Math.max(tabBodyLeft.value + val, wrapper?.offsetWidth - content?.offsetWidth));
    }
  }
};
function getContextMenuDisabledKeys(tabId: string) {
  const disabledKeys: App.Global.DropdownKey[] = [];

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
  x: number;
  y: number;
  tabId: string;
}

const dropdown: DropdownConfig = reactive({
  visible: false,
  x: 0,
  y: 0,
  tabId: ''
});

function setDropdown(config: Partial<DropdownConfig>) {
  Object.assign(dropdown, config);
}

let isClickContextMenu = false;

function handleDropdownVisible(visible: boolean) {
  if (!isClickContextMenu) {
    setDropdown({ visible });
  }
}
function setBodyLeft(val: number) {
  tabBodyLeft.value = val;
}
async function handleContextMenu(e: MouseEvent, tabId: string) {
  e.preventDefault();

  const { clientX, clientY } = e;

  isClickContextMenu = true;

  const DURATION = dropdown.visible ? 150 : 0;

  setDropdown({ visible: false });

  setTimeout(() => {
    setDropdown({
      visible: true,
      x: clientX,
      y: clientY,
      tabId
    });
    isClickContextMenu = false;
  }, DURATION);
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
        <template #left>
          <ElButton v-show="initArrow" text bg :disabled="leftDisabled" @click="handleScroll(distance)">
            <icon-ep-arrow-left-bold></icon-ep-arrow-left-bold>
          </ElButton>
        </template>
        <template #conent>
          <div
            ref="tabRef"
            class="flex h-full pr-18px transition-400"
            :class="[themeStore.tab.mode === 'chrome' ? 'items-end' : 'items-center gap-12px']"
            :style="{ transform: `translateX(${tabBodyLeft}px)` }"
          >
            <PageTab
              v-for="tab in tabStore.tabs"
              :key="tab.id"
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
          </div>
        </template>
        <template #right>
          <div class="tab-left-btn mx-4">
            <ElButton v-show="initArrow" text bg :disabled="rightDisabled" @click="handleScroll(-distance)">
              <icon-ep-arrow-right-bold></icon-ep-arrow-right-bold>
            </ElButton>
          </div>
        </template>
      </BetterScroll>
    </div>
    <ReloadButton :loading="!appStore.reloadFlag" @click="refresh" />
    <FullScreen :full="appStore.fullContent" @click="appStore.toggleFullContent" />
  </DarkModeContainer>
  <ContextMenu
    :visible="dropdown.visible"
    :tab-id="dropdown.tabId"
    :disabled-keys="getContextMenuDisabledKeys(dropdown.tabId)"
    :x="dropdown.x"
    :y="dropdown.y"
    @update:visible="handleDropdownVisible"
  ></ContextMenu>
</template>

<style scoped></style>
