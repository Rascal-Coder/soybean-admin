<script setup lang="ts">
import { computed } from 'vue';
import type { VNode } from 'vue';
import { useSvgIconRender } from '@sa/hooks';
import { useAuthStore } from '@/store/modules/auth';
import { useRouterPush } from '@/hooks/common/router';
import { $t } from '@/locales';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { ElDropdownMenu } from 'element-plus';

defineOptions({
  name: 'UserAvatar'
});

const authStore = useAuthStore();
const { routerPushByKey, toLogin } = useRouterPush();
const { SvgIconVNode } = useSvgIconRender(SvgIcon);

function loginOrRegister() {
  toLogin();
}

type DropdownKey = 'user-center' | 'logout';

type DropdownOption = {
  key: DropdownKey;
  label: string;
  icon?: () => VNode;
};

const options = computed(() => {
  const opts: DropdownOption[] = [
    {
      label: $t('common.userCenter'),
      key: 'user-center',
      icon: SvgIconVNode({ icon: 'ph:user-circle', fontSize: 18 })
    },
    {
      label: $t('common.logout'),
      key: 'logout',
      icon: SvgIconVNode({ icon: 'ph:sign-out', fontSize: 18 })
    }
  ];

  return opts;
});

function logout() {
  authStore.resetStore();
  // window.$dialog?.info({
  //   title: $t('common.tip'),
  //   content: $t('common.logoutConfirm'),
  //   positiveText: $t('common.confirm'),
  //   negativeText: $t('common.cancel'),
  //   onPositiveClick: () => {
  //     authStore.resetStore();
  //   }
  // });
}

function handleDropdown(key: DropdownKey) {
  if (key === 'logout') {
    logout();
  } else {
    routerPushByKey(key);
  }
}
</script>

<template>
  <ElButton v-if="!authStore.isLogin" text @click="loginOrRegister">
    {{ $t('page.login.common.loginOrRegister') }}
  </ElButton>
  <ElDropdown v-else trigger="click" @command="handleDropdown">
    <div>
      <ButtonIcon>
        <SvgIcon icon="ph:user-circle" class="text-icon-large" />
        <span class="text-16px font-medium">{{ authStore.userInfo.userName }}</span>
      </ButtonIcon>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="option in options" :key="option.key" divided :icon="option.icon" :command="option.key">
          {{ option.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped></style>
