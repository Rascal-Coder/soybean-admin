<template>
  <div class="page-func-axios">
    <BaseBox title="基础示例(请打开f12查看network)">
      <ElButton type="primary" class="mb5" @click="handleGet">触发一个get请求(默认成功不会提示)</ElButton>
      <ElButton type="primary" class="mb5" @click="handlePost">触发一个post请求(成功会提示)</ElButton>
      <ElButton type="primary" class="mb5" @click="handlePut">触发一个put请求(默认失败会提示)</ElButton>
      <ElButton type="primary" class="mb5" @click="handleDelete">触发一个delete请求(失败不会提示)</ElButton>
    </BaseBox>

    <BaseBox title="取消重复请求">
      <ElButton type="primary" class="mb5" @click="handleSameApi">触发5个重复请求</ElButton>
    </BaseBox>

    <BaseBox title="请求错误重试 (vue-request)">
      <ElButton type="primary" class="mb5" @click="handleRetry">错误后会重新请求三次</ElButton>
    </BaseBox>
    <BaseBox title="轮询请求 (vue-request)">
      <ElStatistic title="User count" :value="userCount" />
    </BaseBox>
  </div>
</template>

<script lang="ts" setup>
import {
  getTestApi,
  postTestApi,
  putTestApi,
  deleteTestApi,
  sameTestApi,
  retryApi,
  pollingApi
} from '@/service/api/test';
import { reactive, computed } from 'vue';
/**
 * @description 一个 Vue 请求库 https://www.attojs.com/
 */
import { useRequest } from 'vue-request';
import gsap from 'gsap';

defineOptions({
  name: 'Axios'
});
// data
const userInfo = reactive({
  count: 0
});

// computed
const userCount = computed(() => {
  return userInfo.count;
});

// methods
const handleGet = async () => {
  await getTestApi();
};

const handlePost = async () => {
  await postTestApi();
};

const handlePut = async () => {
  await putTestApi();
};

const handleDelete = async () => {
  await deleteTestApi();
};

const handleSameApi = () => {
  sameTestApi();
  sameTestApi();
  sameTestApi();
  sameTestApi();
  sameTestApi();
};

const { run } = useRequest(retryApi, {
  errorRetryCount: 3, // it will retry 5 times
  manual: true // You can manually control the retry process
  // errorRetryInterval: 3 * 1000 // The retry interval is 3 seconds
});
const handleRetry = () => {
  run();
};
// 轮询请求
useRequest(pollingApi, {
  pollingInterval: 1000, // 轮询间隔时间
  initialData: 0,
  onSuccess: data => {
    gsap.to(userInfo, { duration: 0.8, count: data });
  }
});
</script>
