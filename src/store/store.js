import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './rootState'
import getters from './getters'
Vue.use(Vuex)

let store = new Vuex.Store({
  mutations,
  actions,
  getters,
  state,
  strict: true
})

export default store
