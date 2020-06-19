<template>
  <v-container
    pt-12
    id="contact-us"
  >
    <v-row justify="center">
      <form
        name="contactus"
        action="/"
        method="post"
        netlify
        netlify-honeypot="bot-field"
      >
        <input
          type="hidden"
          name="form-name"
          value="contactus"
        />
        <v-container fill-height>
          <v-card
            color="transparent"
            flat
          >
            <v-row>
              <v-col cols="12">
                <div>
                  <v-text-field
                    label="Your Name*"
                    for="name"
                    type="text"
                    name="name"
                    outlined
                    required
                    color="primary"
                  />
                </div>
              </v-col>

              <v-col cols="12">
                <div>
                  <v-text-field
                    label="Your Number*"
                    for="phone"
                    type="text"
                    name="phone"
                    required
                    outlined
                    color="primary"
                  />
                </div>
              </v-col>
              <div>
                <v-container>
                  <v-col text-center>
                    <v-btn
                      type="submit"
                      value="Send message"
                      color="primary"
                      @click="Checkout()"
                    >Send</v-btn>
                  </v-col>
                </v-container>
              </div>
            </v-row>
          </v-card>
        </v-container>
      </form>

    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        order: this.cart
      },
      valid: false,

      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],

      phoneRules: [
        v => !!v || "Phone is required",
        v =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            v
          ) || "Phone must be valid"
      ]
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart;
    }
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    handleSubmit() {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({ "form-name": "contact", ...this.form })
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error));
    },
    Checkout() {
      let info = {
        name: this.form.name,
        phone: this.form.phone,
        order: this.cart
      };
      this.$store.dispatch("cart/postOrder", info);
      this.dialog = false;
    }
  }
};
</script>
