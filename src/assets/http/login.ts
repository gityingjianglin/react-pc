import request from './request';
// 根据客户端代码获取clientId
export const getClientId: any = (query: any) => {
  return request({
    url: `/system/client/getClientId/${query}`,
    method: 'get',
  });
};

// 获取系统的集团配置参数
export const getGroupParam: any = (clientId: any, grantCode: any) => {
  return request({
    url: `/system/client/getHaierAuthConfig/${clientId}/${grantCode}`,
    method: 'get',
  });
};

// 判断token是否失效
export const checkToken: any = (clientId: any, grantCode: any) => {
  return request({
    url: '/auth/checkToken',
    method: 'post',
  });
};


// 获取项目token
export const haierAccountInfo: any = (clientId: any, grantCode: any) => {
  return request({
    url: `/auth/haierAccountInfo/${clientId}/${grantCode}`,
    method: 'get',
  });
};
