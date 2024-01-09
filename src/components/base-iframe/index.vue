<template>
  <div v-ra-loading="loading" class="h-full relative" :loading-full="false">
    <iframe class="wh-full" :src="src" @load="handleIframeLoad"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const loading = ref(false);
interface IProps {
  src: string;
}
defineProps<IProps>();
const handleIframeLoad = () => {
  loading.value = false;
};
onMounted(() => {
  loading.value = true;
});
</script>

<style scoped lang="scss"></style>
