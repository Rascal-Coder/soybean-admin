import axios from 'axios';
import type { AxiosResponse, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
import {
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData
} from './utils';
import { localStg } from '@/utils/storage';
import { AxiosLoading, AxiosRetry, AxiosCancel } from './hooks';
type RefreshRequestQueue = (config: AxiosRequestConfig) => void;
const defaultBackendConfig = {
  codeKey: 'code',
  dataKey: 'data',
  msgKey: 'msg',
  successCode: '0000'
};
const axiosRetry = new AxiosRetry();
const axiosCancel = new AxiosCancel();
/**
 * 封装axios请求类
 * @author Soybean<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: App.Service.BackendResultConfig;

  isRefreshing: boolean;

  retryQueues: RefreshRequestQueue[];

  loadingInstance: AxiosLoading;

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(axiosConfig: AxiosRequestConfig, backendConfig: App.Service.BackendResultConfig = defaultBackendConfig) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
    this.isRefreshing = false;
    this.retryQueues = [];
    this.loadingInstance = new AxiosLoading();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (
        config: InternalAxiosRequestConfig & App.Service.RequestConfigExtra
      ): Promise<InternalAxiosRequestConfig> => {
        const handleConfig = { ...config };
        const { cancelSame, loading, isRetry } = handleConfig;
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType;
          handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 设置token
          const token = localStg.get('token');

          const Authorization = token ? `Bearer ${token}` : '';

          Object.assign(handleConfig.headers, { Authorization });
        }
        if (loading && !isRetry) {
          this.loadingInstance.addLoading();
        }
        if (cancelSame) {
          axiosCancel.addPending(handleConfig);
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      ((response: AxiosResponse<any, any>) => {
        const { status } = response;

        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode } = this.backendConfig;
          // 请求成功
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey]);
          }

          // TODO: token失效, 刷新token

          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null);
        }
        axiosCancel.removePending(response.config);
        const error = handleResponseError(response);

        return handleServiceResult(error, null);
      }) as unknown as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
      (axiosError: AxiosError) => {
        if (axiosError.code === 'ERR_CANCELED') return null;
        const handleAxiosErrorConfig = { ...axiosError.config } as InternalAxiosRequestConfig &
          App.Service.RequestConfigExtra;

        const { isRetry, retryCount } = handleAxiosErrorConfig;
        if (isRetry && (handleAxiosErrorConfig._retryCount || 0) < retryCount!) {
          axiosRetry.retry(this.instance, axiosError);
          return null;
        }
        axiosCancel.removePending(axiosError.config || {});
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
