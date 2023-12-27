<template>
  <ElSkeleton v-bind="getPropsValue">
    <template #default>
      <slot></slot>
    </template>
    <template #template>
      <slot name="template"></slot>
      <div v-if="!$slots.template && isBox">
        <ElRow :gutter="8">
          <ElCol :span="22"><ElSkeletonItem variant="text" /></ElCol>
        </ElRow>
        <ElRow :gutter="8">
          <ElCol :span="8"><ElSkeletonItem variant="text" /></ElCol>
          <ElCol :span="15"><ElSkeletonItem variant="text" /></ElCol>
        </ElRow>
        <ElRow :gutter="8">
          <ElCol :span="6"><ElSkeletonItem variant="text" /></ElCol>
          <ElCol :span="18"><ElSkeletonItem variant="text" /></ElCol>
        </ElRow>
        <ElRow :gutter="8">
          <ElCol :span="13"><ElSkeletonItem variant="text" /></ElCol>
          <ElCol :span="8"><ElSkeletonItem variant="text" /></ElCol>
        </ElRow>
        <ElRow :gutter="8">
          <ElCol :span="4"><ElSkeletonItem variant="text" /></ElCol>
          <ElCol :span="3"><ElSkeletonItem variant="text" /></ElCol>
          <ElCol :span="16"><ElSkeletonItem variant="text" /></ElCol>
        </ElRow>
      </div>
    </template>
  </ElSkeleton>
</template>

<script lang="ts" setup>
import { useAttrs, computed } from 'vue';

defineOptions({
  name: 'BaseSkeleton'
});
interface Props {
  loading: boolean;
  count: number;
  animated: boolean;
  rows: number;
  isBox: boolean;
  throttle: number;
}
const props = withDefaults(defineProps<Partial<Props>>(), {
  loading: false,
  count: 1,
  animated: true,
  rows: 3,
  isBox: false,
  throttle: 0
});

const attrs = useAttrs();

const getPropsValue = computed(() => {
  return { ...props, ...attrs };
});
</script>

<style lang="scss">
.el-skeleton__item {
  height: 14px;
  margin: 4px 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
