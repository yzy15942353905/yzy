import request from '../request'

/**
 * @description: 根据自行车id，查询自行车的评论
 * @param {*} params  
 * bicycleId
 * @return {*}
 * commentList
 */
export const getBicycleComment = (params) => {
    return request({
        url: "/bicycleComment/page",
        method: "get",
        params
    })
}
export const getAllComment = (params) => {
    return request({
        url: "/bicycleComment/page",
        method: "get",
        params
    })
}
/**
 * @description: 取消标记
 * @return {*} Boolean
 */
export const putComment = (id) => {

    return request({
        url: `/bicycleComment/putComment/${id}`,
        method: "post",

    })
}
/**
 * @description: 标记违规评论
 * @return {*} Boolean
 */
export const offComment = (id) => {

    return request({
        url: `/bicycleComment/offComment/${id}`,
        method: "post",

    })
}
/**
 * @description: 删除评论
 * @return {*} Boolean
 */
export const delComment = (id) => {
    return request({
        url: `/bicycleComment/delComment/${id}`,
        method: "post",

    })
}