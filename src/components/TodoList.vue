<template>
  <div class="todo-list">
    <!-- Fetch Todos Button -->
    <v-container class="mt-4">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-btn color="primary" class="fetch-todos" @click="fetchTodos">
            Get Todos
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

    <!-- Todo Table -->
    <v-container v-if="todos.length" class="mt-4">
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
              <tr v-for="todo in todos" :key="todo.id">
                <td>{{ todo.id }}</td>
                <td>{{ todo.task }}</td>
                <td>{{ todo.completed }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import axios from "axios";

export default {
  name: "TodoList",
  setup() {
    const keycloak = inject("keycloak");
    const todos = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const fetchTodos = async () => {
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

        //const apiUrl = process.env.VUE_APP_API_URL;

        // API request with token
        const response = await axios.get(
          process.env.VUE_APP_API_URL,
          {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              Accept: "*/*",
            },
          }
        );
        todos.value = response.data;
      } catch (err) {
        error.value = "Failed to fetch todos. Please try again later.";
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return { todos, loading, error, fetchTodos };
  },
};
</script>

<style scoped>
.todo-list {
  margin: 20px auto;
  text-align: center;
}

.fetch-todos {
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
