import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import moka from './modules/components'
import editor from './modules/editor'
import user from './modules/user'
Vue.use(Vuex)
console.log ( process.env )
export default new Vuex.Store({
  getters: getters,
  modules: {
    moka,
    editor,
    user
  }
})
