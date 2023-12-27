export const resultSuccess = (data: any = null, message = '请求成功') => {
  return {
    code: 200,
    data,
    message
  };
};

export const resultError = (message = '请求失败') => {
  return {
    code: 500,
    data: null,
    message
  };
};
