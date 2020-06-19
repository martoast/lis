<template>
  <v-container
    pt-12
    fill-height
  >
    <form
      name="contactus"
      action="/thanks"
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
          color="rgb(245,245,245, 0.4)"
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
                  label="Your Email*"
                  for="email"
                  type="email"
                  name="email"
                  required
                  outlined
                  color="primary"
                />
              </div>
            </v-col>

            <v-col cols="12">
              <div>
                <v-textarea
                  label="Your Message*"
                  for="message"
                  name="message"
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
                  >Send</v-btn>
                </v-col>
              </v-container>
            </div>
          </v-row>
        </v-card>
      </v-container>
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: ""
      }
    };
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
    }
  }
};
</script>
