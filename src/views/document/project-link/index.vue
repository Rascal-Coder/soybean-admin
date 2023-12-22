<template>
  <div class="layout-padding-view">
    <div class="layout-link-warp">
      <i class="layout-link-icon iconfont icon-xingqiu"></i>
      <div class="layout-link-msg">页面 {{ $t(state.title) }} 已在新窗口中打开</div>
      <el-button class="mt-7" round @click="onGotoFullPage">
        <span>立即前往体验</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, watch } from 'vue';
const route = useRoute();
const state = reactive({
  title: '',
  href: ''
});
watch(
  () => route.path,
  () => {
    state.title = route.meta.i18nKey as string;
    state.href = route.meta.href as string;
  },
  { immediate: true }
);
// 立即前往
const onGotoFullPage = () => {
  window.open(state.href);
};
</script>

<style scoped lang="scss">
.layout-link-warp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--el-fill-color);
  padding: 1rem;
  i.layout-link-icon {
    position: relative;
    font-size: 100px;
    color: var(--el-color-primary);
    &::after {
      content: '';
      position: absolute;
      left: 50px;
      top: 15px;
      width: 15px;
      height: 100px;
      background: linear-gradient(
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05),
        rgba(235, 255, 255, 0.5),
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.01)
      );
      transform: rotate(-15deg);
      animation: toRight 5s linear infinite;
    }
  }
  .layout-link-msg {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 15px;
  }
}
@keyframes toRight {
  0% {
    left: -5px;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -5px;
  }
}
</style>
