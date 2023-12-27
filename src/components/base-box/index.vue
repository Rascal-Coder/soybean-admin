<template>
  <div ref="baseBoxRef" class="base-box-container base-box-bg" :class="{ shadow, hover }">
    <div v-if="title || $slots.title" class="base-box-header">
      <div class="flex-y-center justify-between">
        <div v-if="!$slots.title" class="base-box-title flex-y-center">
          {{ title }}
          <ElTooltip v-if="showHelp" effect="dark" :content="helpText" placement="right">
            <icon-ep:info-filled class="ml3 cursor-pointer" font-size="18px" />
          </ElTooltip>
        </div>
        <div class="base-box-extra text-right">
          <slot name="extra"></slot>
        </div>
      </div>

      <slot name="title"></slot>
    </div>
    <div class="base-box-content">
      <ElScrollbar :style="getStyle">
        <BaseSkeleton :loading="loading" is-box>
          <slot></slot>
        </BaseSkeleton>
      </ElScrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isString } from '@sa/utils';
import { computed, ref } from 'vue';
defineOptions({
  name: 'BaseBox'
});
interface Props {
  title: string;
  shadow: boolean;
  hover: boolean;
  showHelp: boolean;
  helpText: string;
  maxHeight: number | string;
  height: number | string;
  loading: boolean;
}
const props = withDefaults(defineProps<Partial<Props>>(), {
  title: '',
  shadow: true,
  hover: true,
  showHelp: false,
  helpText: '提示',
  maxHeight: '100%',
  height: '100%',
  loading: false
});

const baseBoxRef = ref();

const getStyle = computed(() => {
  const { height, maxHeight } = props;
  return {
    height: isString(height) ? height : `${height}px`,
    maxHeight: isString(maxHeight) ? maxHeight : `${maxHeight}px`
  };
});

defineExpose({
  instance: baseBoxRef
});
</script>

<style lang="scss" scoped>
.base-box-bg {
  background-color: var(--el-fill-color-blank);
}
.base-box-container {
  overflow: hidden;
  border: 1px solid var(--el-card-border-color);
  border-radius: 4px;
  transition: var(--el-transition-duration);

  &.hover:hover,
  &.shadow {
    box-shadow: var(--el-box-shadow-light);
  }

  & + .base-box-container {
    margin-top: 16px;
  }

  .base-box-header {
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    border-bottom: 1px solid rgb(175 175 175 / 30%);
  }

  .base-box-content {
    box-sizing: border-box;
    padding: 25px;
  }
}
</style>
