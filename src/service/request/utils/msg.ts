import { ERROR_MSG_DURATION, NO_ERROR_MSG_CODE } from '@/constants';
import { messageError, messageSuccess } from '@/utils/message';
import type { AxiosResponse } from 'axios';
/** 错误消息栈，防止同一错误同时出现 */
const errorMsgStack = new Map<string | number, string>([]);

function addErrorMsg(error: App.Service.RequestError) {
  errorMsgStack.set(error.code, error.msg);
}
function removeErrorMsg(error: App.Service.RequestError) {
  errorMsgStack.delete(error.code);
}
function hasErrorMsg(error: App.Service.RequestError) {
  return errorMsgStack.has(error.code);
}

/**
 * 显示错误信息
 * @param error
 */
export function showErrorMsg(error: App.Service.RequestError) {
  if (!error.msg || NO_ERROR_MSG_CODE.includes(error.code) || hasErrorMsg(error)) return;

  addErrorMsg(error);
  window.console.warn(error.code, error.msg);
  messageError(error.msg, { duration: ERROR_MSG_DURATION });
  setTimeout(() => {
    removeErrorMsg(error);
  }, ERROR_MSG_DURATION);
}
export function showSuccessMsg(response: AxiosResponse<any, any>, msgKey: App.Service.BackendResultConfig['msgKey']) {
  const { successMessage, method } = response.config as App.Service.ExtraAxiosRequestConfig;
  if (method === 'get') return;
  const backend = response.data;
  successMessage && messageSuccess(backend[msgKey]);
}
