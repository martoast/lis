<template>
  <div>
    <div>
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
            <div>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                  >Shopping Cart</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                  >Name of step 2</v-stepper-step>

                  <v-divider></v-divider>

                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                      class="mb-12"
                      color="transparent"
                      flat
                    >
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
                        <h2>Your total is: $ {{Total}}</h2>
                      </v-card-actions>
                    </v-card>

                    <v-btn
                      color="primary"
                      @click="e1 = 2"
                    >
                      Continue
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card
                      class="mb-12"
                      color="transparent"
                      height="300px"
                      flat
                    >

                      <Netlify />
                    </v-card>

                  </v-stepper-content>

                </v-stepper-items>
              </v-stepper>
            </div>

          </v-card>
        </v-dialog>
      </v-row>

    </div>

  </div>

</template>
<script>
import Netlify from "~/components/sections/netlify-form";
export default {
  components: {
    Netlify
  },
  data() {
    return {
      dialog: false,
      dialog2: false,
      selected: [],
      e1: 1,

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
    Checkout() {
      let info = {
        name: this.firstname,
        lastname: this.lastname,
        phone: this.phone
      };
      this.$store.dispatch("cart/postOrder", info);
      this.dialog = false;
    }
  }
};
</script>
