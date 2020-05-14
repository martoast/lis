<template>
  <div id="app">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
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
  </div>
</template>
<script>
export default {
  layout: "login",
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
        await this.$fireAuth.createUserWithEmailAndPassword(
          this.Email,
          this.Password
        );
        $nuxt._router.push("/");
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>
