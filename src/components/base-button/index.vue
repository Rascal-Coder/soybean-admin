<template>
  <el-button v-if="hasAuth" v-bind="getPropsValue">
    <slot></slot>
    <template v-if="$slots.loading" #loading>
      <slot name="loading"></slot>
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon"></slot>
    </template>
  </el-button>
</template>

<script lang="ts" setup>
import { omit } from '@/utils/common';
import { useAttrs, computed } from 'vue';
import { usePermission } from '@/hooks';
defineOptions({
  name: 'BaseButton'
});
const TypeList = ['primary', 'success', 'warning', 'danger', 'info', 'default'] as const;
interface IProps {
  type?: (typeof TypeList)[number];
  plain?: boolean;
  auth?: string;
  loading?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'default',
  plain: false,
  auth: '',
  loading: false
});
const { hasPermission } = usePermission();

const attrs = useAttrs();
const getPropsValue = computed(() => {
  const newProps = { ...omit<IProps, 'auth'>(props, 'auth') };
  return { ...newProps, ...attrs };
});

const hasAuth = computed(() => {
  if (!props.auth) return true;
  return hasPermission(props.auth);
});
</script>

<style scoped></style>
