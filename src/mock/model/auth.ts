interface UserModel extends Api.Auth.UserInfo {
  token: string;
  refreshToken: string;
  password: string;
}

export const userModel: UserModel[] = [
  {
    token: '__TOKEN_SOYBEAN__',
    refreshToken: '__REFRESH_TOKEN_SOYBEAN__',
    userId: '0',
    userName: 'Soybean',
    roles: ['super'],
    password: 'soybean123'
  },
  {
    token: '__TOKEN_SUPER__',
    refreshToken: '__REFRESH_TOKEN_SUPER__',
    userId: '1',
    userName: 'Super',
    roles: ['super'],
    password: 'super123'
  },
  {
    token: '__TOKEN_ADMIN__',
    refreshToken: '__REFRESH_TOKEN_ADMIN__',
    userId: '2',
    userName: 'Admin',
    roles: ['admin'],
    password: 'admin123'
  },
  {
    token: '__TOKEN_USER01__',
    refreshToken: '__REFRESH_TOKEN_USER01__',
    userId: '3',
    userName: 'User01',
    roles: ['user'],
    password: 'user01123'
  }
];
