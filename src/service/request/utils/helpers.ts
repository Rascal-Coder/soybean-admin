import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/modules/auth';
import { localStg } from '@/utils/storage';
import { fetchRefreshToken } from '@/service/api';

/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetStore } = useAuthStore();
  const refreshToken = localStg.get('refreshToken') || '';
  const { data } = await fetchRefreshToken(refreshToken);
  console.log('data', data);

  if (data) {
    localStg.set('token', data.token);
    localStg.set('refreshToken', data.refreshToken);

    const config = { ...axiosConfig };
    if (config.headers) {
      config.headers.Authorization = data.token;
    }
    return config;
  }

  resetStore();
  return null;
}
