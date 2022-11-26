/*
 * @Description: 
 * @Date: 2022-11-09 14:40:33
 * @LastEditTime: 2022-11-25 21:37:20
 * @FilePath: \vue_test\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import {
  router
} from './router'
import store from './store'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./style/index.css"
import "./style/resetCss.css"
import MyTable from "./components/MyTable"

import commonUtils from './utils/commonUtils'
Vue.component(MyTable.name, MyTable)
Vue.use(ElementUI);
Vue.prototype.$commonUtils = commonUtils
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')