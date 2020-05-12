<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-content>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        label="Email"
                        name="email"
                        type="text"
                        v-model="Email"
                      ></v-text-field>

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="Password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="createUser()">Login</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-content>
      </v-app>
    </v-app>
  </div>
</template>
<script>
export default {
  created() {
    const vm = this;

    vm.$fireAuth.onAuthStateChanged(async function(user) {
      if (user) {
        try {
          // const messageRef = vm.$fireStore.collection("users").doc(user.email);
          // await messageRef
          //   .get()
          //   .then(function(doc) {
          //     if (doc.exists) {
          //       console.log(doc.data().menu);
          //       let FullMenu = doc.data().menu;
          //       vm.$store.commit("menu/setMenu", FullMenu);
          //     } else {
          //       // doc.data() will be undefined in this case
          //       console.log("No menu has been created!");
          //     }
          //   })
          //   .catch(function(error) {
          //     console.log("Error getting document:", error);
          //   });
          if (user === "test456@gmail.com") {
            console.log("success");
          }
          console.log(user);
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
  },
  props: {
    source: String
  },
  data() {
    return {
      Email: "",
      Password: ""
    };
  },
  methods: {
    async createUser() {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.Email,
          this.Password
        );
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>
