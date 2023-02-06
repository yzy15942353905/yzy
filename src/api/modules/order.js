/*
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-01 15:20:45
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-01 15:21:03
 * @FilePath: \yzy-2\src\api\modules\order.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '../request'

/**
 * @description: 获取我的订单或全部订单，userId为空则为全部
 * @param {*} params userId 
 * @return {*} orderList
 */
export const getMyOrder = (params) => {
    return request({
        url: "/myOrder/page",
        method: "get",
        params
    })
}
/**
 * @description: 下单
 * @param {*} data order对象
 * @return {*} Boolean
 */
export const submitOrder = (data) => {
    return request({
        url: "/myOrder",
        method: "post",
        data
    })
}

/**
 * @description: 取消订单
 * @param {*} order_id
 * @return {*} Boolean
 */
export const cancelOrder = (order_id) => {
    return request({
        url: `/myOrder/cancelOrder/${order_id}`,
        method: "post",
        
    })
}
/**
 * @description: 删除订单
 * @param {*} order_id
 * @return {*} Boolean
 */
 export const deleteOrder = (order_id) => {
    return request({
        url: `/myOrder/del/${order_id}`,
        method: "post",
        
    })
}