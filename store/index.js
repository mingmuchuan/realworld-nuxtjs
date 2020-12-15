
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
}


export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const action = {
  setUser (state, user) {
    state.user = user
    }
  }
  export const actions = {
    //nuxt提供的方法，服务端返回给客户端的数据，第一次进来的时候
    nuxtServerInit ({ commit }, { req }) {
      let user = null
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie)
        try {
          user = JSON.parse(parsed.user)
        } catch (err) {
          // No valid cookie found
        }
      }
      commit('setUser', user)
    }
}