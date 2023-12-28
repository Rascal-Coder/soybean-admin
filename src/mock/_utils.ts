export const resultSuccess = (data: any = null, message = '请求成功') => {
  return {
    code: 200,
    data,
    message
  };
};

export const resultError = (message = '请求失败', code = 500) => {
  return {
    code,
    data: null,
    message
  };
};
