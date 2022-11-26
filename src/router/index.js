/*
 * @Description: 
 * @Date: 2022-11-24 14:50:21
 * @LastEditTime: 2022-11-26 17:14:51
 * @FilePath: \vue_test\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [{
        name: "首页",
        path: "/index",
        component: () => import("@/components"),
        meta: {
            info: "首页"
        },
        children: [{

            name: "one",
            path: "/one",
            component: () => import("@/pages/one"),
            meta: {
                info: "one"
            },
            children: [{
                name: "two",
                path: "/two",
                component: () => import("@/pages/two"),
                meta: {
                    info: "two"
                },
            }]
        }, ]
    }, {
        name: "系统管理",
        path: "/systemss",
        redirect: '/index',
        component: () => import("@/components"),
        meta: {
            info: "系统管理"
        },
        children: [{
            name: "系统管理",
            path: "/system",
            component: () => import("@/pages/system"),
            meta: {
                info: "系统管理"
            },
            children: [

            ]

        }]
    }, {
        path: "/404",
        name: "404",
        component: () => import("@/components/404"),
        meta: {
            hidden: true
        }
    },
    // 请务必将此路由放在最后
    {
        path: '*',
        redirect: '/404',
        meta: {
            hidden: true
        }

    }
]

export const asyncRoutes = [{
    path: "/roleSystem",
    name: "权限管理",
    redirect: '/index',
    component: () => import("@/components"),
    meta: {
        info: "权限管理"
    },
    children: [{
        path: "/role",
        name: "权限",
        component: () => import("@/pages/role"),
        meta: {
            info: "权限管理"
        }
    }],
}]

export const router = new Router({
    routes: constantRoutes

})