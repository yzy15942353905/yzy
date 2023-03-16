/*
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-16 16:50:27
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-03-14 13:33:16
 * @FilePath: \yzy-2\src\api\modules\bicycle.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "../request";

/**
 * @description: 自行车列表
 * @param {*} params userId
 * @return {*} bicycleList
 */
export const getBicycleList = (params) => {
  return request({
    url: "/bicycle/page",
    method: "get",
    params,
  });
};
/**
 * @description: 根据id删除自行车
 * @param {*} bicycleId
 * @return {*} trueOrFalse
 */
export const deleteById = (bicycleId) => {
  return request({
    url: `/bicycle/del/${bicycleId}`,
    method: "post",
  });
};
/**
 * @description: 新增或修改自行车信息 有id则为修改
 * @param {*} data Bicycle Entity
 * @return {*}  trueOrFalse
 */
export const saveOrUpdate = (data) => {
  return request({
    url: `/bicycle`,
    method: "post",
    data,
  });
};
/**
 * @description: 根据id查询自行车信息
 * @param {*} bicycleId
 * @return {*} Bicycle Entity
 */
export const getById = (bicycleId) => {
  return request({
    url: `/bicycle/${bicycleId}`,
    method: "get",
  });
};

/**
 * @description: 自行车管理列表
 * @param {*}
 * bicycleName
 * bicycleType
 * address
 * status
 * @return {*} BicycleList
 */
export const getBicycleListMange = (params) => {
  return request({
    url: `/bicycle/bicycleMangeList`,
    method: "get",
    params,
  });
};
/**
 * @description: 上架自行车
 * @param {*} bicycleId
 * @return {*}  trueOrFalse
 */
export const putShelf = (bicycleId) => {
  return request({
    url: `/bicycle/putShelf/${bicycleId}`,
    method: "post",
  });
};
/**
 * @description: 下架自行车
 * @param {*} bicycleId
 * @return {*}  trueOrFalse
 */
export const offShelf = (bicycleId) => {
  return request({
    url: `/bicycle/offShelf/${bicycleId}`,
    method: "post",
  });
};
/**
 * @description: 维修自行车
 * @param {*} bicycleId
 * @return {*}  trueOrFalse
 */
export const maintain = (bicycleId) => {
  return request({
    url: `/bicycle/maintain/${bicycleId}`,
    method: "post",
  });
};
