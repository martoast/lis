<template>
  <div>
    <v-app-bar
      v-scroll="onScroll"
      :color="!isScrolling ? 'transparent' : 'rgba(13, 3, 29, .95)'"
      :flat="!isScrolling"
      app
    >
      <VuetifyLogo />

      <v-spacer />
      <div class="hidden-md-and-up">
        <v-toolbar-items>
          <v-btn
            to="/contact"
            dark
            color="success"
            class="mr-12"
          >
            Contact Us
          </v-btn>
          <v-icon
            @click.stop="drawer = !drawer"
            dark
          >mdi-menu</v-icon>
        </v-toolbar-items>
      </div>
      <!-- <div class="hidden-sm-and-down">
        <v-toolbar-items>
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :active-class="!isScrolling ? 'primary--text' : undefined"
            :to="item.to"
            text
            dark
          >
            <span v-text="item.text" />
          </v-btn>
        </v-toolbar-items>
      </div> -->
      <div>
        <v-toolbar-items class="pr-12 pt-4">

          <CheckoutModal />

        </v-toolbar-items>
      </div>
    </v-app-bar>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        :right="right"
        temporary
        fixed
        src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Lis & Isha
              </v-list-item-title>
              <v-list-item-subtitle>
                Cannabis Queens
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item
            v-for="item in Menuitems"
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import CheckoutModal from "~/components/sections/CheckoutModal.vue";

export default {
  components: {
    VuetifyLogo,
    CheckoutModal
  },
  data: () => ({
    isScrolling: false,

    clipped: false,
    drawer: false,
    fixed: false,
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "Vuetify.js",
    Menuitems: [
      { title: "Home", icon: "mdi-home-city", to: "/" },
      { title: "Log in", icon: "dashboard", to: "/" },
      {
        title: "Register",
        icon: "dashboard",
        to: "/"
      }
    ]
  }),
  computed: {
    items() {
      return [
        {
          to: "/",
          text: "Home"
        },
        {
          to: "/services/",
          text: "Services"
        },
        {
          to: "/projects",
          text: "About"
        },
        {
          to: "/contact",
          text: "Contact"
        }
      ];
    }
  },

  methods: {
    ...mapMutations(["toggleDrawer"]),
    onScroll() {
      this.isScrolling =
        (window.pageYOffset || document.documentElement.scrollTop || 0) > 25;
    }
  }
};
</script>
