import { testRequest } from '../request';

/**
 * login
 * @param userName user name
 * @param password password
 */
export function fetchLogin(userName: string, password: string) {
  return testRequest.post<Api.Auth.LoginToken>(
    '/login',
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
  return testRequest.get<Api.Auth.UserInfo>('/getUserInfo');
}

/**
 * refresh token
 * @param refreshToken refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return testRequest.post<Api.Auth.LoginToken>('/refreshToken', {
    refreshToken
  });
}
