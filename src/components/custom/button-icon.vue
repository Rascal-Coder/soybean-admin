<script setup lang="ts">
import { computed } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import type { Placement } from 'element-plus';

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false
});

interface Props {
  /**
   * button class
   */
  class?: string;
  /**
   * iconify icon name
   */
  icon?: string;
  /**
   * tooltip content
   */
  tooltipContent?: string;
  /**
   * tooltip placement
   */
  tooltipPlacement?: Placement;
}

const props = withDefaults(defineProps<Props>(), {
  class: '!h-36px !text-icon',
  icon: '',
  tooltipContent: '',
  tooltipPlacement: 'bottom'
});

interface ButtonProps {
  className: string;
}

const [DefineButton, Button] = createReusableTemplate<ButtonProps>();

const cls = computed(() => {
  let clsStr = props.class;

  if (!clsStr.includes('h-')) {
    clsStr += ' h-36px';
  }

  if (!clsStr.includes('text-')) {
    clsStr += ' text-icon';
  }

  return clsStr;
});
</script>

<template>
  <!-- define component: Button -->
  <DefineButton v-slot="{ $slots, className }">
    <ElButton text :class="className" :autofocus="false">
      <div class="flex-center">
        <component :is="$slots.default" />
      </div>
    </ElButton>
  </DefineButton>

  <!-- template -->
  <ElTooltip v-if="tooltipContent" :placement="tooltipPlacement" :content="tooltipContent">
    <Button :class-name="cls" v-bind="$attrs">
      <slot>
        <SvgIcon :icon="icon" />
      </slot>
    </Button>
  </ElTooltip>
  <Button v-else :class-name="cls" v-bind="$attrs">
    <slot>
      <SvgIcon :icon="icon" />
    </slot>
  </Button>
</template>

<style scoped></style>
