import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import CustomAxiosInstance from './instance';
import type { AxiosLoading } from './hooks';
type RequestMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestParam {
  url: string;
  method?: RequestMethod;
  data?: any;
  axiosConfig?: AxiosRequestConfig & App.Service.RequestConfigExtra;
}
interface RequestResponse {
  instance: AxiosInstance;
  method: RequestMethod;
  url: string;
  data?: any;
  config?: AxiosRequestConfig & App.Service.RequestConfigExtra;
}
interface LoadingParams {
  loadingInstance: AxiosLoading;
  isLoading: boolean | undefined;
}
const defaultConfig: App.Service.RequestConfigExtra = {
  cancelSame: false,
  retryCount: 3,
  loading: false,
  errorMessage: true,
  successMessage: false
};
/**
 * 创建请求
 * @param axiosConfig - axios配置
 * @param backendConfig - 后端接口字段配置
 */
export function createRequest(
  axiosConfig: AxiosRequestConfig,
  backendConfig?: Partial<App.Service.BackendResultConfig>
) {
  const customInstance = new CustomAxiosInstance(axiosConfig, backendConfig ?? {});
  const { instance, loadingInstance } = customInstance;
  /**
   * 异步promise请求
   * @param param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  async function asyncRequest<T>(param: RequestParam): Promise<App.Service.RequestResult<T> | undefined> {
    const { url } = param;
    const method = param.method || 'get';

    const _axiosConfig = { ...defaultConfig, ...param.axiosConfig };

    const { loading } = _axiosConfig;
    try {
      const res = (await promiseRequest(
        {
          instance,
          method,
          url,
          data: param.data,
          config: _axiosConfig
        },
        {
          loadingInstance,
          isLoading: loading
        }
      )) as App.Service.RequestResult<T>;

      return res;
    } catch (error) {
      window.console.error('Error:', error);
      return undefined;
    }
  }

  /**
   * get请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function get<T>(url: string, config?: AxiosRequestConfig & App.Service.RequestConfigExtra) {
    return asyncRequest<T>({ url, method: 'get', axiosConfig: config });
  }

  /**
   * post请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function post<T>(url: string, data?: any, config?: AxiosRequestConfig & App.Service.RequestConfigExtra) {
    return asyncRequest<T>({ url, method: 'post', data, axiosConfig: config });
  }
  /**
   * put请求
   * @param url - 请求地址
   * @param data - 请求的body的data
   * @param config - axios配置
   */
  function put<T>(url: string, data?: any, config?: AxiosRequestConfig & App.Service.RequestConfigExtra) {
    return asyncRequest<T>({ url, method: 'put', data, axiosConfig: config });
  }

  /**
   * delete请求
   * @param url - 请求地址
   * @param config - axios配置
   */
  function handleDelete<T>(url: string, config?: AxiosRequestConfig & App.Service.RequestConfigExtra) {
    return asyncRequest<T>({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
}

async function getRequestResponse(params: RequestResponse) {
  const { instance, method, url, data, config } = params;
  let res: any;

  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }

  return res;
}

function promiseRequest<T>(params: RequestResponse, loadingParams: LoadingParams) {
  const { loadingInstance, isLoading } = loadingParams;
  return new Promise((resolve, reject) => {
    getRequestResponse(params)
      .then(res => {
        resolve(res as App.Service.RequestResult<T>);
      })
      .catch((e: App.Service.RequestError) => {
        if (isLoading) {
          loadingInstance.closeLoading();
        }
        reject(e);
      })
      .finally(() => {
        if (isLoading) {
          loadingInstance.closeLoading();
        }
      });
  });
}
