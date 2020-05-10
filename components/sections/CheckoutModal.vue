<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="50%"
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
          item-key="name"
          show-select
          item-selected
          v-model="selected"
          class="elevation-1"
        >

        </v-data-table>

        <v-card-actions>
          <!-- <p>{{selected}}</p> -->

          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            v-if="this.selected.length > 0"
            @click="Remove()"
          >Delete Item</v-btn>
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

      SelectedOrder: ["shit"],

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
    // selected() {
    //   return this.SelectedOrder;
    // }
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
