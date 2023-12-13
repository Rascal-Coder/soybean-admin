import type { MessageOptions, ElMessageBoxOptions, messageType } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
interface MessageBoxConfig extends ElMessageBoxOptions {
  confirmBack?: () => void;
  cancelBack?: () => void;
}

const defaultMessageConfig: MessageOptions = {
  center: true,
  duration: 2500,
  grouping: true
};

const defaultConfig: ElMessageBoxOptions = {
  title: '提示',
  type: 'warning',
  showClose: true,
  showCancelButton: true,
  showConfirmButton: true,
  cancelButtonText: '取消',
  confirmButtonText: '确定',
  closeOnClickModal: false,
  closeOnPressEscape: false,
  center: false,
  draggable: false
};
export const messageBox = async (message: string, config?: MessageBoxConfig) => {
  const options = { ...defaultConfig, ...config };
  const { title, confirmBack, cancelBack, ...rest } = options;
  return new Promise(resolve => {
    ElMessageBox.confirm(message, title, {
      ...rest
    })
      .then(() => {
        if (confirmBack) {
          confirmBack();
        }
        resolve(true);
      })
      .catch(() => {
        if (cancelBack) {
          cancelBack();
        }
      });
  });
};

const message = (type: messageType, text: string, close?: () => void, config?: MessageOptions) => {
  const options = { ...defaultMessageConfig, ...config };
  return ElMessage({
    message: text,
    type,
    onClose: close,
    ...options
  });
};

export const messageSuccess = (text: string, close?: () => void, config?: MessageOptions) =>
  message('success', text, close, config);
export const messageWarning = (text: string, close?: () => void, config?: MessageOptions) =>
  message('warning', text, close, config);
export const messageInfo = (text: string, close?: () => void, config?: MessageOptions) =>
  message('info', text, close, config);
export const messageError = (text: string, close?: () => void, config?: MessageOptions) =>
  message('error', text, close, config);
