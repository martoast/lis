<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      v-if="cart.length > 0"
      persistent
      max-width="50%"
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
          show-select
          item-selected
          v-model="selected"
          class="elevation-1"
        >

        </v-data-table>

        <v-card-actions>
          <!-- <p>{{selected}}</p> -->

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
            @click="dialog = false"
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
        { text: "Amount", value: "quantity" }
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
    Remove() {
      for (let i = 0; i < this.selected.length; i++) {
        this.$store.commit("cart/remove", this.selected[i]);
      }

      console.log("remove");
    },
    handleClick(value) {
      console.log(value);
      console.log("test");
    }
  }
};
</script>
