import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import data from './modules/data'
import datadate from './modules/datadate'
import maps from './modules/maps'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    data,
    datadate,
    maps
  }
})
