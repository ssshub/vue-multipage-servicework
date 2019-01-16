
const mutations = {
  ['SET_UID'] (state, uid) {
    state.uid = uid
  },
  ['SET_TOKEN'] (state, token) {
    state.token = token
  },
  ['SET_COLLECTIONLIST'] (state, collectionList) {
    state.collectionList = collectionList
  }
}

export default mutations
