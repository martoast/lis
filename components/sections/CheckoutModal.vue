<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      v-if="cart.length > 0"
      max-width="70%"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          text
          v-on="on"
        >
          <span>{{cart.length}} X</span>
          <v-icon x-large>
            mdi-cart-outline
          </v-icon>

        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Checkout</v-card-title>

        <v-data-table
          :headers="headers"
          :items="cart"
          hide-default-header
          hide-default-footer
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">

            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>

        </v-data-table>

        <v-card-actions>

          <h2>{{Total}}</h2>

          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            v-if="this.selected.length > 0"
            @click="Remove()"
          >Delete Items</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="Checkout()"
          >Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      dialog2: false,
      selected: [],

      headers: [
        { text: "Item", value: "product.name" },
        { text: "Type", value: "product.type" },

        { text: "select", value: "select" },
        { text: "Amount", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart;
    },
    Total() {
      var totalCart = 0;
      for (var item in this.cart) {
        let Selected = this.cart[item].select;
        let price = this.cart[item].product[Selected];
        totalCart += price * this.cart[item].quantity;
      }
      return Number(totalCart.toFixed(2));
    }
  },
  methods: {
    deleteItem(item) {
      const index = this.cart.indexOf(item);
      console.log(index);
      confirm("Are you sure you want to delete this item?") &&
        this.$store.commit("cart/remove", item);
    },
    async Checkout() {
      this.$store.dispatch("cart/postOrder");
      this.dialog = false;
    }
  }
};
</script>
