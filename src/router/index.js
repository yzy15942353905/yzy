/*
 * @Description: 
 * @Date: 2022-11-24 14:50:21
 * @LastEditTime: 2022-12-12 13:57:44
 * @FilePath: \vue_test\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from "@/utils/auth"
Vue.use(Router)
export const constantRoutes = [{
    name: "首页",
    path: "/Layout",
    redirect: "/index",
    component: () => import("@/components/Layout"),
    meta: {
        info: "首页",
        icon: "el-icon-s-home",

    },
    children: [{
        name: "Layout",
        path: "/index",
        component: () => import("@/components"),
        meta: {
            icon: "el-icon-s-home", hidden: true
        },
    }
    ]
},
{
    path: "/",
    name: "登录",
    component: () => import("@/components/Login"),
    meta: {
        hidden: true
    }
},
{
    path: "/register",
    name: "注册",
    component: () => import("@/components/Register"),
    meta: {
        hidden: true
    }
},
{
    name: "系统管理",
    path: "/systemss",
    redirect: '/index',
    component: () => import("@/components/Layout"),
    meta: {
        info: "系统管理"
    },
    children: [{
        name: "系统",
        path: "/system",
        component: () => import("@/pages/system"),
        meta: {
            info: "系统管理"
        },
        children: [

        ]

    }]
},
{
    path: "/personal",
    name: "个人中心",
    component: () => import("@/components/Layout"),
    meta: {
        hidden: true,
        info: "个人中心",

    },
    children: [{
        path: "/personalInfo",
        name: "个人信息",
        component: () => import("@/pages/personalInfo"),
        meta: {

            info: "个人信息",

        }
    }]
},

{
    path: "/404",
    name: "404",
    component: () => import("@/components/404"),
    meta: {
        hidden: true
    }
},
    // 请务必将此路由放在最后
    // {
    //     path: '*',
    //     redirect: '/404',
    //     meta: {
    //         hidden: true
    //     }

    // }
]

export const asyncRoutes = [{
    path: "/roleSystem",
    name: "权限管理",
    component: () => import("@/components/Layout"),
    meta: {
        info: "权限管理"
    },
    children: [{
        path: "/role",
        name: "权限管理",
        component: () => import("@/pages/role"),
        meta: {
            info: "权限管理"
        }
    },],
},
{
    path: "/userSystem",
    name: "用户管理",
    redirect: '/index',
    component: () => import("@/components/Layout"),
    meta: {
        info: "用户管理"
    },
    children: [{
        path: "/userList",
        name: "用户列表",
        component: () => import("@/pages/userList"),
        meta: {
            info: "用户列表"
        }
    }],
},
]

const createRouter = () => new Router({
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        {
            y: 0
        }
    }
})
export const router = createRouter()

// 重置路由
export const resetRoute = () => {
    let newRoute = createRouter()
    router.matcher = newRoute.matcher
}

// router.beforeEach((to, from, next) => {
//     if (to.name == "登录") {
//         if (getToken()) {
//             next('/index')
//         }
//         else {
//             next()
//         }
//     } else if (to.name !== '登录' && !getToken()) next({ name: '登录', query: { redirect: to.path } })
//     else next()
// })