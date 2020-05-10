export const state = () => ({
  cart: []
})

export const mutations = {
  add(state, product) {
    state.cart.push(product)

  },
  remove(state, { product }) {
    state.list.splice(state.list.indexOf(product), 1)
  }
}
