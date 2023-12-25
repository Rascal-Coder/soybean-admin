<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { $t } from '@/locales';
import { loginModuleRecord } from '@/constants/app';
import { useRouterPush } from '@/hooks/common/router';
import { useEleForm, useFormRules } from '@/hooks/common/form';
import { useAuthStore } from '@/store/modules/auth';
import { ElCheckbox } from 'element-plus';
import type { FormRules } from 'element-plus';
import { localStg } from '@/utils/storage';
defineOptions({
  name: 'PwdLogin'
});

const authStore = useAuthStore();
const { toggleLoginModule } = useRouterPush();
const { formRef, validate } = useEleForm();
const { constantRules } = useFormRules();

interface FormModel {
  userName: string;
  password: string;
  captcha: string;
}

const model: FormModel = reactive({
  userName: 'Soybean',
  password: '123456',
  captcha: ''
});
const captchaSrc = ref('/proxy/login/captcha?width=100&height=40');
const rules = reactive<FormRules<typeof model>>({
  userName: constantRules.userName,
  password: constantRules.pwd,
  captcha: constantRules.captcha
});
const remeberMe = ref('1');

function refreshCaptcha() {
  captchaSrc.value = `/proxy/login/captcha?width=100&height=40&t=${new Date().getTime()}`;
}
async function handleSubmit() {
  await validate();
  // 登录逻辑更改，替换为express接口
  // 登录成功后如果checked remeberMe，将用户名和密码存入local
  await authStore.login(model.userName, model.password);
}
onMounted(() => {
  const _remeberMe = localStg.get('remeberMe');
  remeberMe.value = _remeberMe && _remeberMe === '1' ? '1' : '0';
  if (remeberMe.value) {
    const _userName = localStg.get('userName');
    const _password = localStg.get('password');
    model.userName = _userName!;
    model.password = _password!;
  }
});
</script>

<template>
  <ElForm ref="formRef" size="large" :model="model" :rules="rules">
    <ElFormItem prop="userName">
      <ElInput v-model="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
    </ElFormItem>
    <ElFormItem prop="password">
      <ElInput
        v-model="model.password"
        type="password"
        show-password
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </ElFormItem>
    <ElFormItem prop="captcha">
      <div class="flex-1">
        <ElInput v-model="model.captcha" :placeholder="$t('page.login.common.captchaPlaceholder')" />
      </div>
      <div class="w-100px h-40px ml-10px">
        <img :src="captchaSrc" alt="验证码" @click="refreshCaptcha" />
      </div>
    </ElFormItem>
    <ElSpace direction="vertical" :size="24" fill class="w-full">
      <div class="flex-y-center justify-between">
        <ElCheckbox v-model="remeberMe">{{ $t('page.login.pwdLogin.rememberMe') }}</ElCheckbox>
        <ElButton text>{{ $t('page.login.pwdLogin.forgetPassword') }}</ElButton>
      </div>
      <ElButton type="primary" size="large" block round :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </ElButton>
      <div class="flex-y-center justify-between gap-12px">
        <ElButton class="flex-1" block @click="toggleLoginModule('code-login')">
          {{ $t(loginModuleRecord['code-login']) }}
        </ElButton>
        <ElButton class="flex-1" block @click="toggleLoginModule('register')">
          {{ $t(loginModuleRecord.register) }}
        </ElButton>
      </div>
    </ElSpace>
  </ElForm>
</template>

<style scoped></style>
