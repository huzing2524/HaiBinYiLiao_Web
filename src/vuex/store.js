/*
* Created by ll on 3/28/19
*/
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  phoneReg: /^1[3456789]\d{9}$/,
  storeData:{
    adminListItem:{},
    hospitalListItem:{},
    rechargeListItem:{},
    deviceListItem:{},
    doctorsListItem:{},
    patientListItem:{},
    treatmentListItem:{
      treatments:[]
    },
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
