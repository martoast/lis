<template>
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
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div
                    v-if="active"
                    class="display-3 flex-grow-1 text-center"
                  >
                    Active
                  </div>
                </v-scroll-y-transition>
                <v-card-title>
                  {{Order.info.name}} {{Order.info.lastname}}
                </v-card-title>
                <v-card-text>
                  {{Order.info.phone}}
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

  </div>
</template>
<script>
export default {
  async fetch() {
    await this.$store.dispatch("orders/fetchOrders");
  },
  computed: {
    // a computed getter

    Orders() {
      return this.$store.getters["orders/getOrders"];
    }
  }
};
</script>
