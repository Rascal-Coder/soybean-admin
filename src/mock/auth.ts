import type { MockMethod } from 'vite-plugin-mock';
import { userModel } from './model';
import type { MockOption } from './_types';
import { resultError, resultSuccess } from './_utils';
/** 参数错误的状态码 */
const ERROR_PARAM_CODE = 10000;

const ERROR_PARAM_MSG = '参数校验失败！';

export default [
  // 用户+密码 登录
  {
    url: '/mock/login',
    method: 'post',
    response: (options: MockOption) => {
      const { userName = undefined, password = undefined } = options.body;

      if (!userName || !password) {
        return resultError(ERROR_PARAM_MSG, ERROR_PARAM_CODE);
      }

      const findItem = userModel.find(item => item.userName === userName && item.password === password);

      if (findItem) {
        return {
          code: 200,
          message: 'ok',
          data: {
            token: findItem.token,
            refreshToken: findItem.refreshToken
          }
        };
      }
      return resultError('用户名或密码错误！', 1000);
    }
  },
  // 获取用户信息(请求头携带token, 根据token获取用户信息)
  {
    url: '/mock/getUserInfo',
    method: 'get',
    response: (options: MockOption) => {
      // 这里的mock插件得到的字段是authorization, 前端传递的是Authorization字段
      const { authorization = '' } = options.headers;
      const REFRESH_TOKEN_CODE = 66666;
      if (!authorization) {
        return resultError('用户已失效或不存在！', REFRESH_TOKEN_CODE);
      }
      const userInfo: Api.Auth.UserInfo = {
        userId: '',
        userName: '',
        roles: ['user']
      };
      const isInUser = userModel.some(item => {
        const flag = `Bearer ${item.token}` === authorization;
        if (flag) {
          const { userId: itemUserId, userName, roles } = item;
          Object.assign(userInfo, { userId: itemUserId, userName, roles });
        }
        return flag;
      });

      if (isInUser) {
        return resultSuccess(userInfo);
      }

      return resultError('用户信息异常！', REFRESH_TOKEN_CODE);
    }
  },
  {
    url: '/mock/refreshToken',
    method: 'post',
    response: (options: MockOption) => {
      const { refreshToken = '' } = options.body;

      const findItem = userModel.find(item => item.refreshToken === refreshToken);

      if (findItem) {
        const data = {
          token: findItem.token,
          refreshToken: findItem.refreshToken
        };
        return resultSuccess(data);
      }
      return resultError('用户已失效或不存在！', 3000);
    }
  }
] as MockMethod[];
