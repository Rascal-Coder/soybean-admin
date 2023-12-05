<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useThemeStore } from '@/store/modules/theme';
import { themeScrollModeOptions, themePageAnimationModeOptions, themeTabModeOptions } from '@/constants/app';
import SettingItem from '../components/setting-item.vue';
import { ElSelect } from 'element-plus';

defineOptions({
  name: 'PageFun'
});

const themeStore = useThemeStore();

const layoutMode = computed(() => themeStore.layout.mode);

const isMixLayoutMode = computed(() => layoutMode.value.includes('mix'));

const isWrapperScrollMode = computed(() => themeStore.layout.scrollMode === 'wrapper');

function translateOptions(options: Common.Option<string>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }));
}
</script>

<template>
  <ElDivider>{{ $t('theme.pageFunTitle') }}</ElDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex-vertical-stretch gap-12px">
    <SettingItem key="1" :label="$t('theme.scrollMode.title')">
      <ElSelect v-model="themeStore.layout.scrollMode" class="w-120px">
        <ElOption
          v-for="item in translateOptions(themeScrollModeOptions)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </SettingItem>
    <SettingItem key="1-1" :label="$t('theme.page.animate')">
      <ElSwitch v-model="themeStore.page.animate" />
    </SettingItem>
    <SettingItem v-if="themeStore.page.animate" key="1-2" :label="$t('theme.page.mode.title')">
      <ElSelect v-model="themeStore.page.animateMode" class="w-120px">
        <ElOption
          v-for="item in translateOptions(themePageAnimationModeOptions)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </SettingItem>
    <SettingItem v-if="isWrapperScrollMode" key="2" :label="$t('theme.fixedHeaderAndTab')">
      <ElSwitch v-model="themeStore.fixedHeaderAndTab" />
    </SettingItem>
    <SettingItem key="3" :label="$t('theme.header.height')">
      <ElInputNumber
        v-model="themeStore.header.height"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem key="4" :label="$t('theme.header.breadcrumb.visible')">
      <ElSwitch v-model="themeStore.header.breadcrumb.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.header.breadcrumb.visible" key="4-1" :label="$t('theme.header.breadcrumb.showIcon')">
      <ElSwitch v-model="themeStore.header.breadcrumb.showIcon" />
    </SettingItem>
    <SettingItem key="5" :label="$t('theme.tab.visible')">
      <ElSwitch v-model="themeStore.tab.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="5-1" :label="$t('theme.tab.cache')">
      <ElSwitch v-model="themeStore.tab.cache" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="5-2" :label="$t('theme.tab.height')">
      <ElInputNumber
        v-model="themeStore.tab.height"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="5-3" :label="$t('theme.tab.mode.title')">
      <ElSelect v-model="themeStore.tab.mode" class="w-120px">
        <ElOption
          v-for="item in translateOptions(themeTabModeOptions)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical'" key="6-1" :label="$t('theme.sider.width')">
      <ElInputNumber
        v-model="themeStore.sider.width"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical'" key="6-2" :label="$t('theme.sider.collapsedWidth')">
      <ElInputNumber
        v-model="themeStore.sider.collapsedWidth"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="6-3" :label="$t('theme.sider.mixWidth')">
      <ElInputNumber
        v-model="themeStore.sider.mixWidth"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="6-4" :label="$t('theme.sider.mixCollapsedWidth')">
      <ElInputNumber
        v-model="themeStore.sider.mixCollapsedWidth"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical-mix'" key="6-5" :label="$t('theme.sider.mixChildMenuWidth')">
      <ElInputNumber
        v-model="themeStore.sider.mixChildMenuWidth"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem key="7" :label="$t('theme.footer.visible')">
      <ElSwitch v-model="themeStore.footer.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible && isWrapperScrollMode" key="7-1" :label="$t('theme.footer.fixed')">
      <ElSwitch v-model="themeStore.footer.fixed" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="7-2" :label="$t('theme.footer.height')">
      <ElInputNumber
        v-model="themeStore.footer.height"
        :step="1"
        step-strictly
        class="!w-120px"
        controls-position="right"
      />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="7-3" :label="$t('theme.footer.dates')">
      <ElInput v-model="themeStore.footer.dates" class="!w-120px" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="7-4" :label="$t('theme.footer.company')">
      <ElTooltip trigger="click" :content="themeStore.footer.company" placement="left" display-directive="show">
        <ElInput v-model="themeStore.footer.company" class="!w-120px" />
      </ElTooltip>
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="7-5" :label="$t('theme.footer.website')">
      <ElTooltip trigger="click" :content="themeStore.footer.website" placement="left" display-directive="show">
        <ElInput v-model="themeStore.footer.website" class="!w-120px" />
      </ElTooltip>
    </SettingItem>
    <SettingItem
      v-if="themeStore.footer.visible && layoutMode === 'horizontal-mix'"
      key="7-6"
      :label="$t('theme.footer.right')"
    >
      <ElSwitch v-model="themeStore.footer.right" />
    </SettingItem>
  </TransitionGroup>
</template>

<style scoped>
.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  transition: all 0.3s ease-in-out;
}

.setting-list-enter-from,
.setting-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.setting-list-leave-active {
  position: absolute;
}
</style>
