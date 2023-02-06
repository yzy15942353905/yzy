/*
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-29 11:18:04
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-02 11:11:11
 * @FilePath: \yzy-2\src\api\modules\coupon.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '../request'

/**
 * @description: 优惠卷列表
 * @return {*} couponList
 */
export const getCouponList = (params) => {

    return request({
        url: "/coupon/page",
        method: "get",
        params
    })
}

/**
 * @description: 上架优惠卷
 * @return {*} Boolean
 */
export const putCoupon = (id) => {

    return request({
        url: `/coupon/putCoupon/${id}`,
        method: "post",

    })
}
/**
 * @description: 下架优惠卷
 * @return {*} Boolean
 */
export const offCoupon = (id) => {

    return request({
        url: `/coupon/offCoupon/${id}`,
        method: "post",

    })
}
/**
 * @description: 用户自己的优惠卷
 * params => userId
 * @return {*} couponList
 */
export const getMyCoupon = (params) => {
    return request({
        url: `/userCoupon/getMyCoupon`,
        method: "get",
        params
    })
}
/**
 * @description: 租赁时 获取该订单可用的优惠卷
 * params => userId， price=> 订单价格
 * @return {*} couponList
 */
export const getMyUsableCoupon = (params) => {
    return request({
        url: `/userCoupon/getUsableCoupon`,
        method: "get",
        params
    })
}

