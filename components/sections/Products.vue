<template>
  <div>
    <div>
      <SectionHeader
        header="Great Selection of quality flower."
        subHeader="Our Selection"
      />
    </div>
    <v-row>
      <v-col
        v-for="Product in ProductList"
        :key="Product.name"
        cols="12"
        md="4"
      >
        <v-hover
          v-slot:default="{ hover }"
          open-delay="200"
        >
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="Product.image"
            >
            </v-img>

            <v-card-text class="text--primary">
              <div>{{ Product.name }}</div>

              <div>{{ Product.type }}</div>

              <!-- <h2>{{Product.price.get("gram")}}</h2> -->
            </v-card-text>
            <div>
              <v-card
                class="d-flex mb-6"
                color="trasparent"
                text
                tile
              >
                <v-card
                  class="align-self-center"
                  outlined
                  tile
                >
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div>gram</div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div>$ {{ Product.gram }}</div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <v-card
                  class="align-self-center"
                  outlined
                  tile
                >
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div>Eight</div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div>$ {{ Product.eight }}</div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <v-card
                  class="align-self-center"
                  outlined
                  tile
                >
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div>Quarter</div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div>$ {{ Product.quarter }}</div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
                <v-card
                  class="align-self-center"
                  outlined
                  tile
                >
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>
                        <div>oz</div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div>$ {{ Product.oz }}</div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-card>
            </div>

            <div v-if="select">
              <v-row justify="center">
                <v-btn @click="UpdateCart((UpdateType = 'subtract'))">
                  -
                </v-btn>
                <!-- <span class="pa-6">{{Product.quantity}}</span> -->
                <h2 class="pl-6 pr-6">
                  {{Quantity}}
                </h2>
                <v-btn @click="UpdateCart((UpdateType = 'add'))">
                  +
                </v-btn>
              </v-row>
            </div>

            <v-card-actions>
              <v-btn
                v-if="select"
                color="orange"
                text
                class="pr-6"
                @click="Addtocart(Product, select, Quantity)"
              >
                Add to Cart
              </v-btn>

              <v-select
                v-model="select"
                :items="Product.available"
                :rules="[v => !!v || 'Item is required']"
                label="select amount*"
                required
              ></v-select>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import SectionHeader from "~/components/sections/SectionHeader.vue";
export default {
  components: {
    SectionHeader
  },
  async fetch() {
    await this.$store.dispatch("products/fetchProducts");
  },
  data() {
    return {
      // available: ["gram", "eigth", "quarter", "oz"],
      select: "",
      Quantity: 0
    };
  },
  computed: {
    // a computed getter

    ProductList() {
      return this.$store.getters["products/getProducts"];
    }
  },

  methods: {
    Addtocart(Product, select, Quantity) {
      let item = { product: Product, select: select, quantity: Quantity };
      console.log(item);

      this.$store.commit("cart/add", item);

      // console.log(select);
      // console.log(Quantity);
    },
    UpdateCart(UpdateType) {
      if ((UpdateType === "subtract") & (this.Quantity != 0)) {
        // this.ProductList[i].quantity--;
        console.log("call mutation to subtract");
        this.Quantity -= 1;
      } else {
        console.log("call mutation to add");
        this.Quantity += 1;
      }
    }
  }
};
</script>
