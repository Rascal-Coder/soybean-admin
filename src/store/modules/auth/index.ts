import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchLogin, fetchGetUserInfo } from '@/service/api';
import { localStg } from '@/utils/storage';
import { useRouteStore } from '../route';
import { getToken, getUserInfo, clearAuthStorage } from './shared';
import { $t } from '@/locales';
export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const routeStore = useRouteStore();
  const { route, toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());

  const userInfo: Api.Auth.UserInfo = reactive(getUserInfo());

  /**
   * is login
   */
  const isLogin = computed(() => Boolean(token.value));

  /**
   * reset auth store
   */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    authStore.$reset();

    if (!route.value.meta.constant) {
      await toLogin();
    }

    routeStore.resetStore();
  }

  /**
   * login
   * @param userName user name
   * @param password password
   */
  async function login(userName: string, password: string, isChangeAccount: boolean = false) {
    startLoading();
    const res = await fetchLogin(userName, password);
    if (res) {
      const { data: loginToken } = res;
      await loginByToken(loginToken!);

      await routeStore.initAuthRoute();

      !isChangeAccount && (await redirectFromLogin());

      if (routeStore.isInitAuthRoute) {
        ElNotification({
          title: $t('page.login.common.loginSuccess'),
          message: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
          type: 'success',
          duration: 2000
        });
      }
      endLoading();
    } else {
      resetStore();
      endLoading();
    }
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token);
    localStg.set('refreshToken', loginToken.refreshToken);
    const res = await fetchGetUserInfo();
    if (res) {
      // 2. store user info
      localStg.set('userInfo', res.data!);

      // 3. update auth route
      token.value = loginToken.token;
      Object.assign(userInfo, res.data!);
    }
  }

  return {
    token,
    userInfo,
    isLogin,
    loginLoading,
    resetStore,
    login
  };
});
