import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: '',
    list: [],
  },
  // 同步方法
  mutations: {
    setUserId: (state, payLoad) => {
      state.userId = payLoad;
    },
    setList: (state, payLoad) => {
      state.list = payLoad;
    },
  },
  // 异步方法
  actions: {
  },
  getters: {
    userId: (state) => state.userId,
    list: (state) => state.list,
  },
  modules: {
  }
})
