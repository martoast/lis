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
  EDIT_PRODUCT(state, product, productIndex) {
    var products = state.products
    products.splice(products[productIndex], 1, product)
    // products.push(product)
  },

}

export const getters = {
  getProducts(state) {
    return state.products

  }

}
