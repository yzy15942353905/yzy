import request from './request'

export const myFirstAxios = (params) => {
    return request({
        url: "/",
        method: "get",
        params
    })
}
