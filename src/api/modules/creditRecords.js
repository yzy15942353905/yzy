import request from '../request'

/**
 * @description: 查询信誉度的历史记录
 * @param {*} params  
 * userId
 * @return {*}
 * creditRecordList
 */
export const getCreditRecordList = (params) => {
    return request({
        url: "/creditRecords/page",
        method: "get",
        params
    })
}