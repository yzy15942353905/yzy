/*
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-01-16 13:46:21
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-01-16 16:49:53
 * @FilePath: \yzy-2\src\api\modules\collection.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '../request'



/**
 * @description: 收藏事件
 * @param {*} data  
 * userId
 * bicycleId
 * @return {*}
 * trueOrFalse
 */
export const collection = (data) => {

    return request({
        url: "/userBicycleCollection",
        method: "post",
        data
    })
}
/**
 * @description: 取消收藏
 * @param {*} data  
 * userId
 * bicycleId
 * @return {*}
 * trueOrFalse
 */


export const cancelCollection = (data) => {
    return request({
        url: "/userBicycleCollection/cancelCollection",
        method: "post",
        data
    })
}
/**
 * @description: 查看用户自己的收藏
 * userId
 * @return {*}
 *BicycleList
 */
export const getPage = (params) => {
    return request({
        url: "/userBicycleCollection",
        method: "get",
        params
    })
}