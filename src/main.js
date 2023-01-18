/*
 * @Description: 
 * @Date: 2022-11-09 14:40:33
 * @LastEditTime: 2023-01-17 15:11:19
 * @FilePath: \vue_test\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./style/index.css"
import "./style/resetCss.css"

import commonUtils from './utils/commonUtils'

Vue.use(ElementUI);
Vue.prototype.$commonUtils = commonUtils
import './icons' // icon
// 引入阿里巴巴矢量库样式
import './icons/font_xa8crizq4r/iconfont.css'

import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')