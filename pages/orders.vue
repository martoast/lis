<template>
  <div>
    <div>
      <v-item-group>
        <v-container>
          <v-row>
            <v-col
              v-for="Order in Orders"
              :key="Order.info.phone"
              cols="12"
              md="4"
            >
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                  :color="active ? 'primary' : ''"
                  class="d-flex align-center"
                  dark
                  @click="toggle && Inspect(Order)"
                >

                  <v-scroll-y-transition>
                    <div
                      v-if="active"
                      class="display-3 flex-grow-1 text-center"
                    >
                      Active
                    </div>
                  </v-scroll-y-transition>
                  <v-row justify="center">
                    <v-card-title>
                      {{Order.info.name}} {{Order.info.lastname}}
                    </v-card-title>

                  </v-row>

                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

    </div>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            {{this.Name}}
          </v-card-title>

          <v-card class="mx-auto">
            <v-list>
              <v-list-item-group v-model="model">
                <v-list-item
                  v-for="(item, i) in this.CurrentOrder"
                  :key="i"
                >

                  <v-list-item-content>

                    <v-list-item-title v-text="item.product.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.select"></v-list-item-subtitle>

                    <v-list-item-action-text v-text="item.quantity"></v-list-item-action-text>

                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
            <v-btn @click="CompletedOrder()">Completed</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>
<script>
export default {
  async fetch() {
    await this.$store.dispatch("orders/fetchOrders");
  },
  data() {
    return {
      dialog: false,
      Name: "",
      model: 1,
      CurrentOrderID: null,
      CurrentOrder: []
    };
  },
  computed: {
    // a computed getter

    Orders() {
      return this.$store.getters["orders/getOrders"];
    }
  },
  methods: {
    deleteItem(item) {
      const index = this.cart.indexOf(item);
      console.log(index);
      confirm("Are you sure you want to delete this item?") &&
        this.$store.commit("cart/remove", item);
    },
    Inspect(order) {
      this.dialog = true;
      this.Name = order.info.name;
      this.CurrentOrder = order.order;
      this.CurrentOrderID = order.id;

      console.log(this.CurrentOrder);
    },
    CompletedOrder() {
      var orderID = this.CurrentOrderID;
      console.log(orderID);
      // this.$store.commit("orders/remove", orderID);
      this.$fireStore
        .collection("orders")
        .doc(orderID)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
          location.reload();
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>
