import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  plugins: [createdPersistedState()],
  state: {
    topics: [],
  },
  mutations: {
    'STORE_TOPICS' : (state, newState) => {
        state.topics = newState
    },
  }
})