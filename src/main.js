import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./style/index.css"
import "./style/resetCss.css"
import MyTable from "./components/MyTable"

Vue.component(MyTable.name, MyTable)
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
