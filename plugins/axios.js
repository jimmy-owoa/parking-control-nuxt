export default function ({ $axios, app, store }) {
  console.log(store)
  $axios.onRequest(config => {
    if (store.state.auth) {
      config.headers.common['Authorization'] = store.state.auth.accessToken
    }
  })
}