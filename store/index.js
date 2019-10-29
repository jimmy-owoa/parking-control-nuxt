const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
  return {
    auth: null,
    username: null,
    user: null
  }
}
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setUser(state, user) {
    state.user = user;
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth);
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  }
}
export const getters = {
  getToken(state){
    if (state.auth)
      return state.auth.accessToken
  },
  getUser(state){
    return state.user
  },
  getUsername(state){
    if (state.username)
      return state.username
  }
}
