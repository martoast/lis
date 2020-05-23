export const state = () => ({
  orders: [],
  completed: []

})

export const actions = {
  async fetchOrders({ commit }) {
    console.log("test")
    const messageRef = this.$fireStore.collection("orders");

    await messageRef
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          commit("add", doc.data());


        });
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  },


}

export const mutations = {
  add(state, order) {
    state.orders.push(order)

  },

  async remove(state, order) {
    var orders = state.orders
    orders.splice(orders.indexOf(order), 1)
    const messageRef = this.$fireStore
      .collection("orders")
      .doc(order);
    try {

      await messageRef.delete();
    } catch (e) {
      alert(e);
      return;
    }
    alert("Success.");
  },


}

export const getters = {
  getOrders(state) {

    return state.orders


  }

}
