import Vuex from 'vuex'
import Vue from 'vue'

import userInfo from './modules/userInfo'
Vue.use(Vuex)

const store = new Vuex.Store({
    namespaced: true,
    modules: {
        userInfo
    }
})
export default store