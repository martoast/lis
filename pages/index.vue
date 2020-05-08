<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <Products />

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import Products from "~/components/sections/Products.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
    Products
  }
};
</script>
