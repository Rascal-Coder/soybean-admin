import axios from 'axios';
import type { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import {
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData,
  showErrorMsg,
  showSuccessMsg
} from './utils';
import { localStg } from '@/utils/storage';
import { AxiosLoading, AxiosCancel } from './hooks';

type RefreshRequestQueue = (config: AxiosRequestConfig) => void;
const defaultBackendConfig: App.Service.BackendResultConfig = {
  codeKey: 'code',
  dataKey: 'data',
  msgKey: 'msg',
  successCode: 200
};
const defaultAxiosConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10 * 1000 // 请求超时时间
};
const axiosCancel = new AxiosCancel();
/**
 * 封装axios请求类
 * @author Rascal-Coder<meno.qiqio@gmail.com>
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
  constructor(axiosConfig: AxiosRequestConfig, backendConfig: Partial<App.Service.BackendResultConfig>) {
    this.backendConfig = { ...defaultBackendConfig, ...backendConfig };
    const _axiosConfig = { ...defaultAxiosConfig, ...axiosConfig };
    this.instance = axios.create(_axiosConfig);
    this.setInterceptor();
    this.isRefreshing = false;
    this.retryQueues = [];
    this.loadingInstance = new AxiosLoading();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config: App.Service.ExtraAxiosRequestConfig): Promise<App.Service.ExtraAxiosRequestConfig> => {
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
        const handleAxiosErrorConfig = { ...axiosError.config } as App.Service.ExtraAxiosRequestConfig;

        const { errorMessage } = handleAxiosErrorConfig;

        errorMessage && showErrorMsg(error);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      ((response: AxiosResponse<any, any>) => {
        const { status } = response;
        const { errorMessage } = response.config as App.Service.ExtraAxiosRequestConfig;
        axiosCancel.removePending(response.config);
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode, msgKey } = this.backendConfig;
          // 请求成功
          if (backend[codeKey] === successCode) {
            showSuccessMsg(response, msgKey);
            return handleServiceResult(null, backend[dataKey]);
          }

          // TODO: token失效, 刷新token

          const error = handleBackendError(backend, this.backendConfig);
          errorMessage && showErrorMsg(error);
          return handleServiceResult(error, null);
        }

        const error = handleResponseError(response);
        errorMessage && showErrorMsg(error);
        return handleServiceResult(error, null);
      }) as unknown as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
      (axiosError: AxiosError) => {
        if (axiosError.code === 'ERR_CANCELED') return null;
        const handleAxiosErrorConfig = { ...axiosError.config } as App.Service.ExtraAxiosRequestConfig;

        axiosCancel.removePending(axiosError.config || {});
        const { isRetry, errorMessage } = handleAxiosErrorConfig;
        const error = handleAxiosError(axiosError);
        errorMessage && showErrorMsg(error);
        if (isRetry) {
          return Promise.reject(axiosError.response);
        }
        return handleServiceResult(error, null);
      }
    );
  }
}
