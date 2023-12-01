<script setup lang="ts">
import { $t } from '@/locales';
import { useRouterPush } from '@/hooks/common/router';
import { ElForm, ElInput, ElSpace } from 'element-plus';

defineOptions({
  name: 'CodeLogin'
});

const { toggleLoginModule } = useRouterPush();
</script>

<template>
  <ElForm size="large">
    <ElFormItem>
      <ElInput :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </ElFormItem>
    <ElFormItem>
      <ElInput :placeholder="$t('page.login.common.phonePlaceholder')" />
    </ElFormItem>
    <ElFormItem>
      <ElInput :placeholder="$t('page.login.common.codePlaceholder')" />
    </ElFormItem>
    <ElSpace direction="vertical" :size="18" class="w-full" fill>
      <ElButton type="primary" size="large" round>
        {{ $t('common.confirm') }}
      </ElButton>
      <ElButton size="large" round @click="toggleLoginModule('pwd-login')">
        {{ $t('page.login.common.back') }}
      </ElButton>
    </ElSpace>
  </ElForm>
</template>

<style scoped></style>
