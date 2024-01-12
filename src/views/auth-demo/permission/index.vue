<template>
  <div class="h-full">
    <BaseBox title="切换账号">
      <ElRadioGroup v-model="userInfo.userName" @change="accountChange(userInfo.userName)">
        <ElRadioButton label="Soybean" />
        <ElRadioButton label="Admin" />
        <ElRadioButton label="User01">User01(无权限)</ElRadioButton>
      </ElRadioGroup>
    </BaseBox>
    <BaseBox title="baseButton方式">
      当前角色：{{ userInfo.roles }}
      <div class="mt-[25px]">
        <BaseButton auth="permission.browse">permission.browse权限</BaseButton>
        <BaseButton auth="permission.create">permission.create权限</BaseButton>
        <BaseButton auth="permission.edit">permission.edit权限</BaseButton>
        <BaseButton auth="permission.remove">permission.remove权限</BaseButton>
      </div>
    </BaseBox>
    <BaseBox title="自定义指令方式">
      当前角色：{{ userInfo.roles }}
      <div class="mt-[25px]">
        <ElButton v-permission="'permission.browse'">permission.browse权限</ElButton>
        <ElButton v-permission="'permission.create'">permission.create权限</ElButton>
        <ElButton v-permission="'permission.edit'">permission.edit权限</ElButton>
        <ElButton v-permission="'permission.remove'">permission.remove权限</ElButton>
      </div>
    </BaseBox>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';

import { toRefs, reactive } from 'vue';
const authStore = useAuthStore();
const { userInfo } = toRefs(authStore);
const state = reactive({
  Soybean: { password: 'soybean123', userName: 'Soybean' },
  Admin: { password: 'admin123', userName: 'Admin' },
  User01: { password: 'user01123', userName: 'User01' }
});
async function accountChange(key: string) {
  const account = state[key as 'Admin' | 'Soybean' | 'User01'];
  await authStore.login(account.userName, account.password, true);
}
</script>

<style scoped></style>
