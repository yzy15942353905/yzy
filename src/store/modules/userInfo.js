/*
 * @Description: 
 * @Date: 2022-11-25 20:33:01
 * @LastEditTime: 2022-11-26 17:18:03
 * @FilePath: \vue_test\src\store\modules\userInfo.js
 */
/*
 * @Description: 
 * @Date: 2022-11-25 20:33:01
 * @LastEditTime: 2022-11-25 21:55:23
 * @FilePath: \vue_test\src\store\modules\userInfo.js
 */
import commonUtils from '@/utils/commonUtils'
import {
    asyncRoutes,
    constantRoutes,
    router
} from '@/router'
const state = {
    // 用户信息
    userInfo: {
        userName: "张三"
    },
    // 用户路由
    userRoutes: []
}
const mutations = {
    SETROLEROUTRES(state, userRoutes) {
        state.userRoutes = userRoutes
    }
}
const actions = {
    setRoleRoutes({
        commit
    }) {
        let roleRoutes = commonUtils.getUserRoutes(asyncRoutes, ["权限管理"])
        let userRoutes = constantRoutes.concat(roleRoutes)
        userRoutes = userRoutes.filter((item) => {
            if (item.meta.hidden) {
                return false
            }
            return true
        })

        router.addRoutes(roleRoutes);
        commit("SETROLEROUTRES", userRoutes)

    }
}
const getter = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getter
}