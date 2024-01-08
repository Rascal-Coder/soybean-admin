<template>
  <BaseBox title="Useage Component">
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
    <Loading
      v-model:active="state.isLoading"
      :can-cancel="state.canCancel"
      :on-cancel="whenCancelled"
      :is-full-page="state.fullPage"
      :height="state.height"
      :width="state.width"
      :color="state.color"
      :loader="state.loader"
      :background-color="state.backgroundColor"
    >
      <template v-if="state.useSlot" #default>
        <h3>Loading ...</h3>
      </template>
    </Loading>
  </BaseBox>
</template>

<script lang="ts" setup>
import { loadersList } from '@/constants';
import { transformedData } from '@/utils/common';
import Loading from '@rascoder/vue-loading';
import { reactive } from 'vue';
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
function handleClick() {
  state.isLoading = true;

  // Simulate async call
  timer = window.setTimeout(() => {
    state.isLoading = false;
  }, state.timeout);
}
function whenCancelled() {
  clearTimeout(timer);
  window.console.log('User cancelled the loader.');
}
</script>
