import { request } from '../request';

/**
 * login
 * @param userName user name
 * @param password password
 */
export function fetchLogin(userName: string, password: string) {
  return request.post<Api.Auth.LoginToken>(
    '/auth/login',
    {
      userName,
      password
    },
    {
      loading: true
      // isRetry: true // 重试 loading会关闭
    }
  );
}

/**
 * get user info
 */
export function fetchGetUserInfo() {
  return request.get<Api.Auth.UserInfo>('/auth/getUserInfo');
}

/**
 * refresh token
 * @param refreshToken refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request.post<Api.Auth.LoginToken>('/auth/refreshToken', {
    refreshToken
  });
}
