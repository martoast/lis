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
              <div>{{Product.name}}</div>

              <div>{{Product.type}}</div>

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
                        <div>Gram</div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div>$ {{Product.price["gram"]}}</div>
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
                        <div>$ {{Product.price["eigth"]}}</div>
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
                        <div>$ {{Product.price["quarter"]}}</div>
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
                        <div>OZ</div>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div>$ {{Product.price["oz"]}}</div>
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-card>
            </div>

            <div v-if="select">
              <v-row justify="center">
                <v-btn @click="UpdateCart(Product, UpdateType='subtract')">
                  -
                </v-btn>
                <!-- <span class="pa-6">{{Product.quantity}}</span> -->
                <h2 class="pl-6 pr-6">
                  {{Product.quantity}}

                </h2>
                <v-btn @click="UpdateCart(Product, UpdateType='add')">
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
                @click="Addtocart(Product, select)"
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
  data() {
    return {
      ProductList: [
        {
          name: "GIRL SCOUT COOKIES (EXOTIC)",
          id: 1,
          type: "HYBRID",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 666 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "TANGIE DREAM (EXOTIC)",
          id: 2,
          type: "SATIVA",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 2.95, eigth: 60, quarter: 110, oz: 420 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "DUTCH TREAT (EXOTIC)",
          id: 3,
          type: "HYBRID",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "ROLLEX OG KUSH (EXOTIC)",
          id: 4,
          type: "INDICA",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 300, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "SENSI STAR (EXOTIC)",
          id: 5,
          type: "INDICA",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "UK CHEESE (EXOTIC)",
          id: 6,
          type: "HYBRID",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "GREEN QUEEN (EXOTIC)",
          id: 7,
          type: "SATIVA",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "CLEMENTINE (EXOTIC)",
          id: 8,
          type: "SATIVA",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        },
        {
          name: "GREEN CRACK (EXOTIC)",
          id: 9,
          type: "SATIVA",
          available: ["Gram", "eigth", "quarter", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: "",
          quantity: 0
        }
      ],
      Cart: [],
      // available: ["Gram", "eigth", "quarter", "OZ"],
      select: ""
    };
  },
  computed: {
    // a computed getter
    FilteredPrice: function() {
      // `this` points to the vm instance

      if (this.select != null) {
        // price = this.ProductList[0];
        return this.ProductList[0].price;
      } else {
        return null;
      }
    }
  },
  methods: {
    Addtocart(Product, select) {
      var Order = {
        id: Product.id,
        select: select,
        quantity: Product.quantity,
        name: Product.name,
        price: Product.price[select] * Product.quantity,
        type: Product.type
      };
      console.log(Order);
      this.Cart.push(Order);
      // if (this.Cart.length > 0) {
      //   for (let i = 0; i < this.Cart.length; i++) {
      //     if (this.Cart[i].id === Product.id) {
      //       // this.Cart.remove(this.Cart[i]);
      //       this.Cart.push(Product);
      //       console.log(this.Cart);
      //     } else {
      //       this.Cart.push(Order);
      //     }
      //   }
      // } else {
      //   this.Cart.push(Order);
      //   console.log(this.Cart, select);
      // }
    },
    UpdateCart(Product, UpdateType) {
      for (let i = 0; i < this.ProductList.length; i++) {
        if (this.ProductList[i].id === Product.id) {
          console.log(Product);
          console.log(UpdateType);
          if (
            (UpdateType === "subtract") &
            (this.ProductList[i].quantity != 0)
          ) {
            this.ProductList[i].quantity--;
          } else {
            this.ProductList[i].quantity++;
          }
          break;
        }
      }
    }
  }
};
</script>
