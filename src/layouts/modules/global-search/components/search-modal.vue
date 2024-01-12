<template>
  <div>
    <ButtonIcon icon="uil-search" tooltip-content="搜索" @click="show = true" />
    <BaseDialog
      v-model:visible="show"
      top="80px"
      title=""
      class="search-dialog"
      min-height="200px"
      width="40%"
      close-on-press-escape
      modal-type="dialog-blur"
      append-to-body
      close-on-click-modal
    >
      <ElInput
        ref="inputRef"
        v-model="keyword"
        class="menu-search-input"
        clearable
        placeholder="请输入关键词搜索"
        @input="handleSearch"
      >
        <template #prepend>
          <icon-uil-search class="text-15px text-#c2c2c2" />
        </template>
        <template v-if="appStore.isMobile" #append>
          <ElButton type="primary" @click="reset">取消</ElButton>
        </template>
      </ElInput>
      <div class="mt-20px">
        <SearchResult
          v-if="resultOptions.length"
          v-model:value="activePath"
          :options="resultOptions"
          @enter="handleEnter"
        />
        <ElEmpty v-else description="暂无搜索结果" :image-size="64" />
      </div>
      <template #footer>
        <SearchFooter v-if="!appStore.isMobile" />
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { onKeyStroke, useDebounceFn } from '@vueuse/core';
import { useRouteStore } from '@/store/modules/route';
import { $t } from '@/locales';
import SearchResult from './search-result.vue';
import SearchFooter from './search-footer.vue';
import { useAppStore } from '@/store/modules/app';
import { delayTimer } from '@sa/utils';
import type { ElegantConstRoute } from '@elegant-router/types';
defineOptions({ name: 'SearchModal' });

const show = ref(false);
const appStore = useAppStore();

const router = useRouter();
const routeStore = useRouteStore();

const keyword = ref('');
const activePath = ref('');
const resultOptions = shallowRef<ElegantConstRoute[]>([]);
const inputRef = ref();
const handleSearch = useDebounceFn(search, 300);

/** 查询 */
function search() {
  resultOptions.value = routeStore.searchMenus.filter(menu => {
    const trimKeyword = keyword.value.toLocaleLowerCase().trim();
    const title = (menu.meta!.i18nKey ? $t(menu.meta!.i18nKey) : menu.meta!.title)!.toLocaleLowerCase();
    return trimKeyword && title.includes(trimKeyword);
  });
  activePath.value = resultOptions.value[0]?.path ?? '';
}
function reset() {
  show.value = false;
  resultOptions.value = [];
  keyword.value = '';
}

/** key up */
function handleUp() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(item => item.path === activePath.value);
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].path;
  } else {
    activePath.value = resultOptions.value[index - 1].path;
  }
}

/** key down */
function handleDown() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(item => item.path === activePath.value);
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = resultOptions.value[index + 1].path;
  }
}

/** key enter */
function handleEnter(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === '') return;
  const routeItem = resultOptions.value.find(item => item.path === activePath.value);
  if (routeItem?.meta?.href) {
    window.open(routeItem?.meta?.href, '__blank');
    router.push(activePath.value);
    reset();
  } else {
    router.push(activePath.value);
    reset();
  }
}

onKeyStroke('Enter', handleEnter);
onKeyStroke('ArrowUp', handleUp);
onKeyStroke('ArrowDown', handleDown);

watch(show, async val => {
  if (val) {
    await delayTimer(20);
    inputRef.value.focus();
  }
});
</script>

<style lang="scss" scoped>
.menu-search-input :deep(.el-input-group__prepend) {
  background-color: var(--el-fill-color-blank);
}
</style>
