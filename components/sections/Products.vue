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
                flat
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

            <v-card-actions>

              <v-btn
                color="orange"
                text
                class="pr-6"
                @click="Addtocart(Product)"
              >
                Add to Cart
              </v-btn>

              <v-select
                v-model="select"
                :items="Product.items"
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
          type: "HYBRID",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 666 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "TANGIE DREAM (EXOTIC)",
          type: "SATIVA",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 2.95, eigth: 60, quarter: 110, oz: 420 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "DUTCH TREAT (EXOTIC)",
          type: "HYBRID",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "ROLLEX OG KUSH (EXOTIC)",
          type: "INDICA",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 300, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "SENSI STAR (EXOTIC)",
          type: "INDICA",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "UK CHEESE (EXOTIC)",
          type: "HYBRID",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "GREEN QUEEN (EXOTIC)",
          type: "SATIVA",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "CLEMENTINE (EXOTIC)",
          type: "SATIVA",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "GREEN CRACK (EXOTIC)",
          type: "SATIVA",
          items: ["Gram", "1/8", "1/4", "OZ"],
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        }
      ],
      Cart: [],
      // items: ["Gram", "1/8", "1/4", "OZ"],
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
      this.Cart.push(Product);
      console.log(this.Cart);
    }
  }
};
</script>
