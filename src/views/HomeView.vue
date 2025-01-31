<!-- <template>
  <div class="home-view">
    <h1>Demo App</h1>
    <UserList />
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue';

export default {
  name: 'HomeView',
  components: {
    UserList,
  },
};
</script>

<style scoped>
.home-view {
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}
</style> -->


<template>
  <div class="home-view">
    <v-app>
      <!-- Header -->
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Demo App</v-toolbar-title>
        <v-spacer></v-spacer>
        <span v-if="username" class="mr-3">Hi, {{ username }}</span>
        <v-btn outlined color="secondary" @click="logout">Logout</v-btn>
      </v-app-bar>

      <!-- Main Content -->
      <v-container>
        <h1>Welcome to the Demo App</h1>
        <UserList />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";
import { inject } from "vue";

export default {
  name: "HomeView",
  components: {
    UserList,
  },
  data() {
    return {
      username: null, // To store the logged-in user's name
    };
  },
  setup() {
    // Access the globally provided Keycloak instance
    const keycloak = inject("keycloak");

    // Return the Keycloak instance to use in the template
    return { keycloak };
  },
  mounted() {
    // Fetch user details from the Keycloak token
    const keycloak = this.$options.setup().keycloak;

    if (keycloak && keycloak.authenticated) {
      this.username = keycloak.tokenParsed?.preferred_username || "User";
    }
  },
  methods: {
    logout() {
      // Perform Keycloak logout and redirect to the login page
      const keycloak = this.$options.setup().keycloak;
      if (keycloak) {
        keycloak.logout({ redirectUri: window.location.origin });
      }
    },
  },
};
</script>

<style scoped>
.home-view {
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

.v-btn {
  text-transform: capitalize;
}
</style>

