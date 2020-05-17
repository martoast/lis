export const state = () => ({
  products: [],

})

export const mutations = {
  add(state, product) {
    state.products.push(product)

  },
  async remove(state, product) {
    var products = state.products
    products.splice(products.indexOf(product), 1)
    const messageRef = this.$fireStore
      .collection("products")
      .doc(product.name);
    try {

      await messageRef.delete();
    } catch (e) {
      alert(e);
      return;
    }
    alert("Success.");
  },
  async EDIT_PRODUCT(state, payload) {
    var products = state.products

    console.log(payload.key3.name)

    products.splice(payload.key1, 1, payload.key2)
    const messageRef = this.$fireStore
      .collection("products")
      .doc(payload.key3.name);
    const messageRef2 = this.$fireStore
      .collection("products")
      .doc(payload.key2.name);
    try {
      await messageRef.delete();

      await messageRef2.set(payload.key2);
    } catch (e) {
      alert(e);
      return;
    }
    alert("Success.");

  },

}

export const getters = {
  getProducts(state) {
    return state.products

  }

}
