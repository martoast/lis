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
        // { text: "price", value: "calories" },
        { text: "quantity", value: "quantity" }
        // { text: "gram (g)", value: "gram" },
        // { text: "eight (1/8)", value: "eight" },
        // { text: "quarter (1/4)", value: "quarter" },
        // { text: "oz (24g)", value: "oz" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
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
                  for (var key in PriceList) {
                    console.log(key, PriceList[key]);

                    let headerthing = { text: key, value: key };

                    let productsthing = { text: key, value: PriceList[key] };

                    vm.headers.push(headerthing);

                    // vm.products.push(productsthing);

                    // let thing = {text: PriceList[i], value: }
                  }

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
