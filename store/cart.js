export const state = () => ({
  cart: []
})

export const mutations = {
  add(state, product) {
    state.cart.push(product)

  },
  remove(state, { product }) {
    state.cart.splice(product, 1)
  }
}
