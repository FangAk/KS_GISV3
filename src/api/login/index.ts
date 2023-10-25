import { http, formatParams } from '@/utils/http/axios';
//用户登录信息
const getLoginInfo = (params: any, headers: any) =>
  http.request({
    url: '/user/getUserInfo',
    params: formatParams(params),
    method: 'get',
    headers,
  });
const userToken = (params: any) =>
  http.request({ url: '/user/login', params: formatParams(params), method: 'post' });
export { getLoginInfo, userToken };
