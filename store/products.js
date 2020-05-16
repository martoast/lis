export const state = () => ({
  products: [],

})

export const mutations = {
  add(state, product) {
    state.products.push(product)

  },
  remove(state, product) {
    var products = state.products
    products.splice(products.indexOf(product), 1)
  },
  EDIT_PRODUCT(state, payload) {
    var products = state.products

    products.splice(payload.key1, 1, payload.key2)

  },

}

export const getters = {
  getProducts(state) {
    return state.products

  }

}
