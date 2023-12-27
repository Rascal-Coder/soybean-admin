import { createRequest } from './request';
import { createServiceConfig, createProxyPattern } from '~/env.config';

const { baseURL, otherBaseURL } = createServiceConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest(
  {
    baseURL: isHttpProxy ? createProxyPattern() : baseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
      'Content-Type': 'application/json'
    },
    timeout: 10 * 1000 // 请求超时时间
  },
  {
    successCode: '0000'
  }
);

export const demoRequest = createRequest(
  {
    baseURL: isHttpProxy ? createProxyPattern('demo') : otherBaseURL.demo
  },
  {
    successCode: '200'
  }
);
export const testRequest = createRequest(
  {
    baseURL: '/mock/'
  },
  {
    msgKey: 'message'
  }
);
