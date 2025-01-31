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
      <v-main>
        <v-container class="mt-5">
          <UserList />
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer app color="secondary" dark height="40px">
        <v-container>
          <v-row justify="center">
            <v-col class="text-center" cols="12">
              <p>&copy; 2024 Camelcase Ltd.</p>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import UserList from "@/components/UserList.vue";

export default {
  name: "HomeView",
  components: { UserList },
  setup() {
    // Inject the Keycloak instance
    const keycloak = inject("keycloak");
    const username = ref(null);

    // Fetch user details on component mount
    onMounted(() => {
      if (keycloak && keycloak.authenticated) {
        username.value = keycloak.tokenParsed?.preferred_username || "User";
      } else {
        console.error("Keycloak instance is not available or not authenticated.");
      }
    });

    // Logout function
    const logout = () => {
      if (keycloak) {
        keycloak.logout({ redirectUri: window.location.origin });
      } else {
        console.error("Keycloak instance is not available.");
      }
    };

    return { username, logout };
  },
};
</script>

<style scoped>
.home-view {
  text-align: left;
  font-family: Arial, sans-serif;
}

.v-btn {
  text-transform: capitalize;
}
</style>
