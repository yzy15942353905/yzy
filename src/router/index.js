import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routes = [
    {
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
        }, {
            name: "two",
            path: "/two",
            component: () => import("@/pages/two"),
            meta: {
                info: "two"
            },
        }]
    }, {
        name: "系统管理",
        path: "system",
        children: [
            {
                name: "系统管理",
                path: "system",
                children: [

                ]
            }
        ]
    }
]

export const router = new Router({
    routes,

})
