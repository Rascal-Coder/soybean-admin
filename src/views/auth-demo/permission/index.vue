<template>
  <div class="h-full">
    <base-box title="baseButton方式">
      当前角色：{{ userInfo.roles }}
      <div class="mt-[25px]">
        <BaseButton auth="permission.browse">permission.browse权限</BaseButton>
        <BaseButton auth="permission.create">permission.create权限</BaseButton>
        <BaseButton auth="permission.edit">permission.edit权限</BaseButton>
        <BaseButton auth="permission.remove">permission.remove权限</BaseButton>
      </div>
    </base-box>
    <base-box title="自定义指令方式">
      当前角色：{{ userInfo.roles }}
      <div class="mt-[25px]">
        <ElButton v-permission="'permission.browse'">permission.browse权限</ElButton>
        <ElButton v-permission="'permission.create'">permission.create权限</ElButton>
        <ElButton v-permission="'permission.edit'">permission.edit权限</ElButton>
        <ElButton v-permission="'permission.remove'">permission.remove权限</ElButton>
      </div>
    </base-box>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/modules/auth';
import { toRefs } from 'vue';
const authStore = useAuthStore();
const { userInfo } = toRefs(authStore);
</script>

<style scoped></style>
