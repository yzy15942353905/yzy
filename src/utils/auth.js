/*
 * @Description: 
 * @Date: 2022-11-26 15:04:53
 * @LastEditTime: 2022-11-26 15:04:55
 * @FilePath: \vue_test\src\utils\auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'loginToken'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}