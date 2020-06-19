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
                      <v-form
                        v-model="valid"
                        name="contactus"
                        action="/thanks"
                        method="post"
                        netlify
                        netlify-honeypot="bot-field"
                      >
                        <input
                          type="hidden"
                          name="form-name"
                          value="contactus"
                        />
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              md="4"
                            >
                              <v-text-field
                                v-model="firstname"
                                :rules="nameRules"
                                :counter="10"
                                label="First name"
                                for="name"
                                name="name"
                                required
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="4"
                            >
                              <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                :counter="10"
                                label="Last name"
                                for="lastname"
                                name="lastname"
                                required
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              md="4"
                            >
                              <v-text-field
                                v-model="phone"
                                :rules="phoneRules"
                                label="Contact number*"
                                for="phone"
                                name="phone"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-btn
                          type="submit"
                          value="Send message"
                          color="primary"
                          @click="Checkout()"
                          v-if="valid != false"
                        >
                          Continue
                        </v-btn>

                        <v-btn text>Cancel</v-btn>
                      </v-form>
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
export default {
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
      ],
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      phone: "",
      phoneRules: [
        v => !!v || "Phone is required",
        v =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            v
          ) || "Phone must be valid"
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
