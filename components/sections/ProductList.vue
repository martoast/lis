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
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Product</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.name"
                    label="name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.type"
                    label="type"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.quantity"
                    label="gram (g)"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.gram"
                    label="gram (g)"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.eight"
                    label="eight"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.quarter"
                    label="quarter"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      dialog: false,
      search: "",
      editedIndex: -1,
      editedItem: {
        name: "",
        type: "",
        quantity: 0,
        gram: 0,
        eight: 0,
        quarter: 0,
        oz: 0,
        available: [],
        image: ""
      },
      defaultItem: {
        name: "",
        type: "",
        quantity: 0,
        gram: 0,
        eight: 0,
        quarter: 0,
        oz: 0,
        available: [],
        image: ""
      },

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
        { text: "oz (24g)", value: "oz" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    products: {
      get() {
        return this.$store.getters["products/getProducts"];
      }
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
  methods: {
    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      console.log(item, this.editedIndex);

      this.editedItem = Object.assign({}, item);
      this.defaultItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.$store.commit("products/remove", item);
    },

    close() {
      this.dialog = false;
    },

    save() {
      let payload = {
        key1: this.editedIndex,
        key2: this.editedItem,
        key3: this.defaultItem
      };

      this.$store.commit("products/EDIT_PRODUCT", payload);
      console.log(this.editedItem);
      this.close();
    }
  }
};
</script>
