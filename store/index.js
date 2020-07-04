export const state = () => ({
  api: 'http://localhost:4000',// 'https://steve-benedictonz-api.herokuapp.com',
  bene: null
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  setDetails(state, bene) {
    state.bene = bene
  }
}

export const getters = {
  getApi: state => {
    return state.api
  },

  getBeneDetails: state => {
    return state.bene
  }
}


export const actions = {
  setDetails({commit}, details) {
    commit('setDetails', details)
  }
}
