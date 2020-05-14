<template>
  <div>
    <div v-if="flag === false">
      <v-row justify="center" align="center">
        <v-card>
          <v-card-title>must be logged in as Administrator</v-card-title>
        </v-card>
      </v-row>
    </div>
    <v-card v-if="flag != false">
      <!-- <div class="pa-12 d-flex flex-row-reverse">
      <v-btn @click="AddProduct()"> Add Product</v-btn>
    </div> -->

      <v-card-title>
        <div class="pa-4 d-flex flex-row-reverse">
          <AddProductModal />
        </div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <div v-if="flag === true" class="pt-2">
        <v-data-table
          :headers="headers"
          :items="products"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        ></v-data-table>
      </div>
    </v-card>
  </div>
</template>
<script>
import AddProductModal from "~/components/sections/AddProductModal.vue";
export default {
  components: {
    AddProductModal
  },
  data() {
    return {
      // products: [],
      search: "",
      flag: false,
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "type", value: "type" },

        { text: "quantity", value: "quantity" },
        { text: "gram (g)", value: "gram" },
        { text: "eight (1/8)", value: "eight" },
        { text: "quarter (1/4)", value: "quarter" },
        { text: "oz (24g)", value: "oz" }
      ]
    };
  },
  computed: {
    products() {
      return this.$store.getters["products/getProducts"];
    }
  },
  created() {
    const vm = this;

    vm.$fireAuth.onAuthStateChanged(async function(user) {
      if (user) {
        try {
          if (user.email === "test456@gmail.com") {
            console.log("success");
            console.log(user);
            vm.flag = true;
            const messageRef = vm.$fireStore.collection("products");

            await messageRef
              .get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());

                  vm.$store.commit("products/add", doc.data());

                  // vm.products.push(doc.data());
                  // console.log(vm.products);
                });
              })
              .catch(function(error) {
                console.log("Error getting document:", error);
              });
          } else {
            alert("Not Loggged in as Administrator");
            console.log(user);
            vm.flag = false;
          }
        } catch (e) {
          // alert(e);
          return;
        }
      } else {
        // No user is signed in.
        console.log("No User logged in");
      }
    });
  },
  methods: {}
};
</script>
