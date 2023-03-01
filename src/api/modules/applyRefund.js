/*
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-27 10:39:38
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-28 09:49:25
 * @FilePath: \毕业设计-vue\src\api\modules\applyRefund.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "../request";

/**
 * @description: 退款列表
 * @param {int} ifHandle
 * @return {*} applyRefundList
 */
export const getApplyRefundList = (params) => {
  return request({
    url: "/applyRefund",
    method: "get",
    params,
  });
};
/**
 * @description: 申请退款
 * @param {applyRefund} applyRefund实例
 *  订单号，orderId
 *  申请原因 refundDesc，
 *  申请类型 refundType
 * @return {*} null
 */
export const applyRefund = (data) => {
  return request({
    url: "/myOrder/applyRefund",
    method: "post",
    data,
  });
};

/**
 * @description: 处理申请退款
 * @param 订单编号 refundId {int}
 * @param 是否同意退款 approvalOrReject {Boolean}
 * @return {*} null
 */
export const handleRefund = (data) => {
  return request({
    url: "/myOrder/handleRefund",
    method: "post",
    data,
  });
};

/**
 * @description: 通过id获取退款信息
 * @param 流水编号 refundId
 * @return {*} refund实例
 */
export const getRefundIdById = (refundId) => {
  return request({
    url: `/applyRefund/${refundId}`,
    method: "get",
  });
};

/**
 * @description: 取消申请退款
 * @param 流水编号 refundId
 * @return {*} null
 */
export const cancelApplyRefund = (refundId) => {
  return request({
    url: `/myOrder/cancelApplyRefund/${refundId}`,
    method: "post",
  });
};