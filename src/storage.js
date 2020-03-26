import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        store_userId:null,
        store_userEmail:null,
        store_userName:null,
        store_token:null,
        store_status:null,
        Admin_work_ById:null
    },
    plugins: [createPersistedState()],
    mutations:{
        muserId: store => store.store_userId,
        muserEmail: store => store.store_userEmail,
        muserName: store => store.store_userName,
        mtoken: store => store.store_token,
        mstatus: store => store.store_status
    }
});