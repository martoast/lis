<template>
  <div>
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
              <div>$12.95</div>
            </v-card-text>

            <v-card-actions>

              <v-btn
                color="orange"
                text
                class="pr-6"
              >
                Add to Cart
              </v-btn>

              <v-select
                v-model="select"
                :items="items"
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
export default {
  data() {
    return {
      ProductList: [
        {
          name: "GIRL SCOUT COOKIES (EXOTIC)",
          type: "HYBRID",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "TANGIE DREAM (EXOTIC)",
          type: "SATIVA",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "DUTCH TREAT (EXOTIC)",
          type: "HYBRID",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "ROLLEX OG KUSH (EXOTIC)",
          type: "INDICA",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "SENSI STAR (EXOTIC)",
          type: "INDICA",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "UK CHEESE (EXOTIC)",
          type: "HYBRID",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "GREEN QUEEN (EXOTIC)",
          type: "SATIVA",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "CLEMENTINE (EXOTIC)",
          type: "SATIVA",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        },
        {
          name: "GREEN CRACK (EXOTIC)",
          type: "SATIVA",
          price: { gram: 12.95, eigth: 60, quarter: 110, oz: 220 },
          image: "http://textimages.mobi/Img/J9I0QL2NBKH7AL474XPF.jpg",
          details: ""
        }
      ],
      items: ["Gram", "1/8", "1/4", "OZ"],
      select: null
    };
  },
  computed: {
    // a computed getter
    reversedMessage: function() {
      // `this` points to the vm instance
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>
