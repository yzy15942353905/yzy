/*
 * @Description: 
 * @Date: 2022-11-10 14:35:12
 * @LastEditTime: 2022-11-28 00:07:06
 * @FilePath: \vue_test\src\api\index.js
 */
import request from './request'

export const login = (data) => {

    return request({
        url: "/user/login",
        method: "post",
        data
    })
}