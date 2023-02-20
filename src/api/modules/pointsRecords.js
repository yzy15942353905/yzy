/*
 * @Author: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @Date: 2023-02-07 17:04:45
 * @LastEditors: Yz_brightFuture 10409053+yz-brightfuture@user.noreply.gitee.com
 * @LastEditTime: 2023-02-07 17:05:04
 * @FilePath: \yzy-2\src\api\modules\pointsRecords copy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEpo'i
 */
import request from '../request'

/**
 * @description: 查询积分的历史记录
 * @param {*} params  
 * userId
 * @return {*}
 * pointsRecordList
 */
export const getPointsRecordList = (params) => {
    return request({
        url: "/pointsRecords/page",
        method: "get",
        params
    })
}