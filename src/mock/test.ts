import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_utils';

export default [
  {
    url: '/mock/test/getTest',
    method: 'get',
    response: () => {
      const data = [];
      for (let i = 0; i < 10000; i++) {
        data.push(i);
      }
      return resultSuccess(data);
    }
  },
  {
    url: '/mock/test/postTest',
    method: 'post',
    response: () => {
      return resultSuccess();
    }
  },
  {
    url: '/mock/test/sameTest',
    method: 'get',
    response: () => {
      const data = [];
      for (let i = 0; i < 10000; i++) {
        data.push(i);
      }
      return resultSuccess(data);
    }
  }
] as MockMethod[];
