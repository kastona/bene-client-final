export const state = () => ({
  api: 'https://steve-benedictonz-api.herokuapp.com'
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const getters = {
  getApi: state => {
    return state.api
  }
}


export const actions = {

}
