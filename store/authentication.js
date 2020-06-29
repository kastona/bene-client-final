export const state = () => ({
  progress: 0

})


export const getters = {
  getUploadProgress: (state) => {
    return state.progress
  }

}

export const mutations = {
  setUploadProgress(state, data) {
    state.progress = data

  },

}


export const actions = {


  createUser({commit, getters}, user) {

      return  this.$axios.post('/users', user)

  },

  loadLoggedUserAvatar({state}) {


    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
      }
    };


    return this.$axios.get(`/users/${state.user.id}/avatar`, axiosConfig)
  },

  async updateUser(vuexContext, user) {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*"
      }
    };
    await this.$axios.patch('/users/me', user, axiosConfig);
    await this.$auth.fetchUser();
  },

  async updatePassword({vuexContext},passwordObj) {
    await this.$axios.patch('/users/me/password', passwordObj)
    await this.$auth.fetchUser()
  },
  async uploadPicture(vuexContext, picsData) {



    let axiosConfig = {
      onUploadProgress: e => vuexContext.commit('setUploadProgress', Math.round(e.loaded * 100 / e.total))
    };


    //users/me/avatar
    await this.$axios.post('/users/me/avatar', picsData, axiosConfig)


  },

  async uploadBenedictionzPic(vuexContext, picsData) {



    let axiosConfig = {
      onUploadProgress: e => vuexContext.commit('setUploadProgress', Math.round(e.loaded * 100 / e.total))
    };


    //users/me/avatar
    await this.$axios.post('/images', picsData, axiosConfig)


  },


}
