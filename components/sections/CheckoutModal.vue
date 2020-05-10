<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          text
          v-on="on"
        >
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
        >

        </v-data-table>

        <v-card-actions>

          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >Disagree</v-btn>
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
      headers: [
        { text: "Item", value: "name" },

        { text: "select", value: "select" },
        { text: "Amount", value: "quantity" },
        { text: "Price", value: "price" }
      ]
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart;
    }
  },
  methods: {
    Remove() {
      // this.$store.commit('cart/remove', product)
      console.log("want to delete");
    }
  }
};
</script>
