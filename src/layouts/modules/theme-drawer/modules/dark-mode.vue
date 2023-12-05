<script setup lang="ts">
import { computed, ref } from 'vue';
import { themeSchemaRecord } from '@/constants/app';
import { useThemeStore } from '@/store/modules/theme';
import { $t } from '@/locales';
import SettingItem from '../components/setting-item.vue';

defineOptions({
  name: 'DarkMode'
});

const themeStore = useThemeStore();

const icons: Record<UnionKey.ThemeScheme, string> = {
  light: 'material-symbols:sunny',
  dark: 'material-symbols:nightlight-rounded',
  auto: 'material-symbols:hdr-auto'
};

function handleSegmentChange(value: string | number) {
  themeStore.setThemeScheme(value as UnionKey.ThemeScheme);
}
const isActiveButtonClass = ref({
  light: '!shadow-sm !shadow-gray !bg-white',
  dark: '!shadow-sm !shadow-[#1f1f1f] !bg-[#1f1f1f]',
  auto: '!shadow-sm !shadow-gray !bg-white'
});
const showSiderInverted = computed(() => !themeStore.darkMode && themeStore.layout.mode.includes('vertical'));
</script>

<template>
  <NDivider>{{ $t('theme.themeSchema.title') }}</NDivider>
  <div class="flex-vertical-stretch gap-16px">
    <div class="i-flex-center">
      <el-button-group size="large" class="!bg-[#f7fafc] dark:!bg-[#121212] rounded px-1">
        <el-button
          v-for="(_value, key) in themeSchemaRecord"
          :key="key"
          text
          :class="[themeStore.themeScheme === key ? isActiveButtonClass[key] : '', '!px-[27px] !py-[5px] !h-31px']"
          @click="handleSegmentChange(key)"
        >
          <SvgIcon :icon="icons[key]" class="text-icon-small text-black dark:text-white" />
        </el-button>
      </el-button-group>
    </div>
    <Transition name="sider-inverted">
      <SettingItem v-if="showSiderInverted" :label="$t('theme.sider.inverted')">
        <ElSwitch v-model="themeStore.sider.inverted" />
      </SettingItem>
    </Transition>
  </div>
</template>

<style scoped>
.sider-inverted-enter-active {
  height: 22px;
  transition: all 0.3s ease-in-out;
}

.sider-inverted-leave-active {
  height: 22px;
  transition: all 0.3s ease-in-out;
}

.sider-inverted-enter-from,
.sider-inverted-leave-to {
  transform: translateX(20px);
  opacity: 0;
  height: 0;
}
</style>
