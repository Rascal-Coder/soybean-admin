<template>
  <BaseBox title="Useage Plugin">
    <div ref="formContainer">
      <ElSpace class="!w-full mb2">
        <label>Loader shape</label>
        <ElSelect v-model="state.loader" class="m-2" placeholder="Select">
          <ElOption v-for="item in state.loadersList" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <ElSwitch v-model="state.fullPage" active-text="Full page?" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <ElSwitch v-model="state.canCancel" active-text="User can cancel?" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <ElSwitch v-model="state.useSlot" active-text="Use slot? (replace shape)" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <span>Color</span>
        <ElColorPicker v-model="state.color" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <span>Background color</span>
        <ElColorPicker v-model="state.backgroundColor" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <span>Height</span>
        <ElInputNumber v-model="state.height" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <span>Width</span>
        <ElInputNumber v-model="state.width" />
      </ElSpace>
      <ElSpace class="!w-full mb2">
        <ElButton @click="handleClick">Show loader</ElButton>
      </ElSpace>
    </div>
  </BaseBox>
</template>

<script setup lang="ts">
import { loadersList } from '@/constants';
import { transformedData } from '@/utils/common';
import type { PluginApi } from '@rascoder/vue-loading';
import { reactive, inject, ref, computed, h } from 'vue';
let timer: number;
const state = reactive({
  loadersList: transformedData(loadersList),
  fullPage: true,
  canCancel: true,
  useSlot: false,
  loader: 'RotateSquare',
  timeout: 3000, // ms
  color: '#00ab00',
  backgroundColor: '#4b4b4b',
  height: 64,
  width: 64,
  isLoading: false
});

const formContainer = ref();
const $loading = inject('$loading') as PluginApi;

const exampleSlots = computed(() => {
  return state.useSlot
    ? {
        default: h(
          'h3',
          {
            class: 'custom-slot'
          },
          'Please Wait ...'
        )
      }
    : {};
});
function handleClick() {
  const loader = $loading.show(
    {
      container: state.fullPage ? null : formContainer.value,
      canCancel: state.canCancel,
      onCancel: whenCancelled,
      color: state.color,
      backgroundColor: state.backgroundColor,
      height: state.height,
      width: state.width,
      loader: state.loader,
      opacity: 0.3,
      lockScroll: true
    },
    exampleSlots.value
  );

  timer = window.setTimeout(() => {
    loader && loader.hide();
  }, state.timeout);
}

function whenCancelled() {
  clearTimeout(timer);
  window.console.log('User cancelled the loader.');
}
</script>

<style scoped></style>
