export const state = () => ({
  user: {
    name: 'Dakup James',
    stageName: 'ND James',
    genre: 'Gospel',
    accountType: 'Free',
    availableSpace: 500,
    usedSpace: 300,
    bio: 'I am passionate and crazy!'
  }
})


export const getters = {
  getUser: state => {
    return state.user
  }
}

export const actions = {
  updateUser({commit}, update) {
    commit('updateUser', update)
  }
}

export const mutations = {
  updateUser(state, update) {
    state.user = update;
  }
}
