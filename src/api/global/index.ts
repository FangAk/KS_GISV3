import { http, formatParams } from '@/utils/http/axios';
//区镇信息
const getAreaInfo = (params: any) =>
  http.request({
    url: '/operate/getAreaInfo',
    params: formatParams(params),
    method: 'post',
  });

//子集片区
const getSubsetArea = (params: any) =>
  http.request({
    url: '/gateway/getSubsetArea',
    params: formatParams(params),
    method: 'post',
  });
//人员信息
const getAccounts = (params: any) =>
  http.request({
    url: '/account/getAccounts',
    params: formatParams(params),
    method: 'post',
  });
//公司信息
//58.210.32.10:9091/webApi/operate/getCompany?companyId=1005
const getCompany = (params: any) =>
  http.request({
    url: '/operate/getCompany',
    params: formatParams(params),
    method: 'post',
  });
export { getAreaInfo, getSubsetArea, getAccounts, getCompany };
