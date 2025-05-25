import request from '../utils/request';

interface LoginParams {
    account: string;
    password: string;
}

export const fetchLogin = (data: LoginParams) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}