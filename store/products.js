export const state = () => ({
  products: []
})

export const mutations = {
  add(state, product) {
    state.products.push(product)

  },
  remove(state, { product }) {
    state.products.splice(product, 1)
  }
}

export const getters = {
  getProducts(state) {
    return state.products

  }

}
