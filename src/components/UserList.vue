<template>
  <div class="user-list">
    <!-- Fetch Users Button -->
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-btn color="primary" class="fetch-users" @click="fetchUsers">
            Get Users
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Loading Indicator -->
    <v-container v-if="loading" class="mt-4 text-center">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-progress-circular indeterminate color="primary" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Error Message -->
    <v-container v-if="error" class="mt-4 text-center">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-alert type="error" outlined>{{ error }}</v-alert>
        </v-col>
      </v-row>
    </v-container>

    <!-- User Table -->
    <v-container v-if="users.length" class="mt-4">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-table dense>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<!-- <script> -->
// import axios from "axios";

// export default {
//   name: "UserList",
//   data() {
//     return {
//       users: [],
//       loading: false,
//       error: null,
//     };
//   },
//   methods: {
//     async fetchUsers() {
//       this.loading = true;
//       this.error = null;
//       try {
//         const response = await axios.get(
//           "https://api.camelcase.club/internal/api/users",
//           {
//             headers: {
//               Accept: "*/*",
//             },
//           }
//         );
//         this.users = response.data;
//       } catch (err) {
//         this.error = "Failed to fetch users. Please try again later.";
//       } finally {
//         this.loading = false;
//       }
//     },
//   },
// };
<!-- </script> -->

<script>
import { inject, ref } from "vue";
import axios from "axios";

export default {
  name: "UserList",
  setup() {
    const keycloak = inject("keycloak");
    const users = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchUsers = async () => {
      loading.value = true;
      error.value = null;

      if (!keycloak || !keycloak.authenticated) {
        error.value = "User is not authenticated.";
        loading.value = false;
        return;
      }

      try {
        // Ensure token is fresh
        await keycloak.updateToken(10);

        // API request with token
        const response = await axios.get(
          "https://api.camelcase.club/internal/api/users",
          {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              Accept: "*/*",
            },
          }
        );
        users.value = response.data;
      } catch (err) {
        error.value = "Failed to fetch users. Please try again later.";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return { users, loading, error, fetchUsers };
  },
};
</script>

<style scoped>
.user-list {
  margin: 20px auto;
  text-align: center;
}

.fetch-users {
  text-transform: capitalize;
  font-weight: bold;
}

.v-btn {
  width: 200px;
}

.v-table {
  width: 100%;
  border-collapse: collapse;
}

.v-table th,
.v-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.v-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}
</style>
