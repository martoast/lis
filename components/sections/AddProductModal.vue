<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="390">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" rounded
          ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Sativa', 'Hybrid', 'Indica']"
                  label="Type"
                  v-model="type"
                  type="text"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Quantity"
                  required
                  v-model="quantity"
                  type="number"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Image src"
                  required
                  v-model="image"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  label="Gram Price"
                  type="number"
                  required
                  v-model="gram"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Eight Price"
                  type="number"
                  required
                  v-model="eight"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Quarter Price"
                  type="number"
                  required
                  v-model="quarter"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Oz Price"
                  type="number"
                  required
                  v-model="oz"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="['gram', 'eight', 'quarter', 'oz']"
                  label="Available"
                  multiple
                  v-model="available"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid>
            <v-textarea
              name="input-7-1"
              filled
              label="Details"
              auto-grow
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              v-model="details"
            ></v-textarea>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="AddProduct()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      name: "",
      type: "",
      details: "",
      gram: "",
      eight: "",
      quarter: "",
      oz: "",
      image: "",
      quantity: null,
      available: []
    };
  },
  methods: {
    async AddProduct() {
      let product = {
        name: this.name,
        type: this.type,
        details: this.details,
        gram: parseInt(this.gram),
        eight: parseInt(this.eight),
        quarter: parseInt(this.quarter),
        oz: parseInt(this.oz),
        image: this.image,
        available: this.available,
        quantity: parseInt(this.quantity)
      };

      const messageRef = this.$fireStore
        .collection("products")
        .doc(product.name);
      try {
        this.$store.commit("products/add", product);
        await messageRef.set(product);
      } catch (e) {
        alert(e);
        return;
      }
      alert("Success.");
      this.dialog = false;
      this.name = "";
      this.type = "";
      this.details = "";
      this.gram = "";
      this.eight = "";
      this.quarter = "";
      this.oz = "";
      this.image = "";
      this.quantity = null;
      this.available = [];
      $nuxt._router.push("/console");
    }
  }
};
</script>
