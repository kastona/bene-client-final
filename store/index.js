export const state = () => ({
  api: 'http://localhost:4000',//'https://steve-benedictonz-api.herokuapp.com',
  bene: null,
  tempUser: null
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  setDetails(state, bene) {
    state.bene = bene
  },
  setTempUser(state, user) {
    state.tempUser = user
  }
}

export const getters = {
  getApi: state => {
    return state.api
  },

  getBeneDetails: state => {
    return state.bene
  },

  getTempUser: state => {
    return state.tempUser
  }
}


export const actions = {
  setDetails({commit}, details) {
    commit('setDetails', details)
  },
  setTempUser({commit}, user) {
    commit('setTempUser', user)
  }
}
