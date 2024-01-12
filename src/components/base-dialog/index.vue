<template>
  <ElDialog v-model="dialogVisible" v-bind="getPropsValue" class="base-dialog" :before-close="handleBeforeClose">
    <template #header="{ close }">
      <div v-if="showHeader" class="base-dialog-header">
        <span v-if="!$slots.title">{{ title }}</span>
        <slot name="title"></slot>
        <ElSpace :size="14" class="base-header-icon">
          <FullScreen :full="fullscreen" @click="toggleFullScreen" />
          <ButtonIcon tooltip-content="关闭" icon="material-symbols:close" @click="close"></ButtonIcon>
        </ElSpace>
      </div>
    </template>

    <ElScrollbar ref="bodyScrollRef" class="el-scrollbar basic-dialog-body" :style="getBodyStyle">
      <slot></slot>
    </ElScrollbar>
    <template v-if="!$slots.footer && showFooter" #footer>
      <div class="base-dialog-footer" :style="{ 'text-align': btnPosition }">
        <BaseButton v-if="showCancelBtn" @click="handleClose">
          {{ cancelText }}
        </BaseButton>
        <BaseButton v-if="showSaveBtn" type="primary" :loading="saveLoading" @click="handleSave">
          {{ saveText }}
        </BaseButton>
      </div>
    </template>
    <slot name="footer"></slot>
  </ElDialog>
</template>

<script lang="ts" setup>
import dialogProps, { extraProps } from './props';
import { computed, useAttrs, ref, unref, nextTick, watch } from 'vue';
import { isFunction } from '@sa/utils';
import { omit } from '@/utils/common';
import { useGlobelProperties } from '@/hooks';
defineOptions({
  name: 'BaseDialog'
});
const props = defineProps(dialogProps);

const emit = defineEmits(['close', 'save', 'update:visible']);

const attrs = useAttrs();

const dialogVisible = ref(false);

const saveLoading = ref(false);

const fullscreen = ref(props.fullscreen);

const bodyScrollRef = ref();
const { $messageBox } = useGlobelProperties();
const getPropsValue = computed(() => {
  const newProps = { ...omit(props, Object.keys(extraProps)) } as any;
  newProps.modalClass = props.modalType || '';
  newProps.showClose = false;
  newProps.fullscreen = unref(fullscreen);
  return { ...newProps, ...attrs };
});

const getBodyStyle = computed(() => {
  const { minHeight, height } = props;
  return {
    minHeight,
    height: unref(getPropsValue).fullscreen ? '100%' : height
  };
});

function showDialog() {
  saveLoading.value = false;
  dialogVisible.value = true;
  nextTick(() => {
    handleScrollTop();
  });
}

function hideDialog() {
  dialogVisible.value = false;
  emit('update:visible', false);
  emit('close');
}

function toggleFullScreen(e: Event) {
  e?.preventDefault();
  e?.stopPropagation();
  fullscreen.value = !fullscreen.value;
}

function handleScrollTop() {
  unref(bodyScrollRef).wrapRef.scrollTop = 0;
}

async function handleBeforeClose() {
  try {
    if (props.closeConfirm) {
      await $messageBox('你确定要关闭弹框吗？');
    }
    hideDialog();
  } catch (err) {
    /* empty */
  }
}

async function handleClose() {
  if (isFunction(props.closeFun)) {
    props.closeFun(hideDialog);
  } else {
    hideDialog();
  }
}

function handleSave() {
  emit('save', (bool: boolean) => {
    saveLoading.value = bool;
  });
}

watch(
  () => props.visible,
  val => {
    dialogVisible.value = val;
  }
);
defineExpose({
  showDialog,
  hideDialog
});
</script>

<style lang="scss">
@import './base-dialog.scss';
</style>
