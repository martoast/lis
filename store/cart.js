export const state = () => ({
  cart: []
})

export const actions = {
  async postOrder({ state }, info) {

    var OrderID = Date.now()
    let ID = OrderID.toString()
    console.log(ID)

    const messageRef = this.$fireStore.collection("orders").doc(ID)
    try {
      await messageRef.set({
        id: ID,
        info: info,
        order: state.cart,
        data: new Date()
      });
    } catch (e) {
      alert(e);
      return;
    }
    alert("Success.");
  },


}

export const mutations = {
  add(state, product) {
    state.cart.push(product)

  },
  remove(state, product) {
    var products = state.cart
    products.splice(products.indexOf(product), 1)

  },

}
