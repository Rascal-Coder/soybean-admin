import { createRequest } from './request';
import { createServiceConfig, createProxyPattern } from '~/env.config';

const { baseURL, otherBaseURL } = createServiceConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

export const request = createRequest({
  baseURL: isHttpProxy ? createProxyPattern() : baseURL,
  headers: {
    apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2'
  }
});

export const demoRequest = createRequest({ baseURL: isHttpProxy ? createProxyPattern('demo') : otherBaseURL.demo });
