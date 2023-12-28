import { testRequest } from '../request';
import { faker } from '@faker-js/faker';
export enum Api {
  GET_TEST = '/test/getTest',
  POST_TEST = '/test/postTest',
  PUT_TEST = '/test/putTest',
  DELETE_TEST = '/test/deleteTest',
  SAME_TEST = '/test/sameTest',
  RETRY_TEST = '/test/retryTest',
  POLLING_TEST = '/test/polling'
}

export const getTestApi = () =>
  testRequest.get(Api.GET_TEST, {
    loading: true
  });

export const postTestApi = (data?: any) => testRequest.post(Api.POST_TEST, data, { successMessage: true });

export const putTestApi = () => testRequest.put(Api.PUT_TEST);

export const deleteTestApi = () => {
  return testRequest.delete(Api.DELETE_TEST, { errorMessage: false });
};

export const sameTestApi = () => testRequest.get(Api.SAME_TEST, { cancelSame: true });

export const retryApi = () => testRequest.get(Api.RETRY_TEST, { isRetry: true, loading: true });
export function pollingApi() {
  const data = faker.number.int({ max: 10000 });
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}
