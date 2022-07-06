import request from './request';

// 获取业务接口
export const getConfigList: any = (query: any) => {
  return request({
    url: `/yingkangoa/admin/config/biz/list`,
    method: 'get',
    params: query,
  });
};
