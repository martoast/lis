<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <div v-if="flag === true">
      <v-data-table
        :headers="headers"
        :items="products"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      search: "",
      flag: false,
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },

        { text: "quantity", value: "quantity" },
        { text: "gram (g)", value: "gram" },
        { text: "eight (1/8)", value: "eight" },
        { text: "quarter (1/4)", value: "quarter" },
        { text: "oz (24g)", value: "oz" }
      ]
    };
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

                  var PriceList = doc.data().price;
                  // for (var key in PriceList) {
                  //   console.log(key, PriceList[key]);

                  //   let headerthing = { text: key, value: key };

                  //   let productsthing = { text: key, value: PriceList[key] };

                  //   vm.headers.push(headerthing);

                  // vm.products.push(productsthing);

                  // let thing = {text: PriceList[i], value: }
                  // }

                  vm.products.push(doc.data());
                  console.log(vm.products);
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
        alert("must log in to access Register");
      }
    });
  }
};
</script>
