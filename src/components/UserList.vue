<template>
  <div class="user-list">
    <button class="fetch-users" @click="fetchUsers">Get Users</button>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Render results in a table -->
    <table v-if="users.length" class="user-table">
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
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('https://api.camelcase.club/api/users', {
          headers: {
            Accept: '*/*',
          },
        });
        this.users = response.data;
      } catch (err) {
        this.error = 'Failed to fetch users. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.user-list {
  text-align: center;
  margin: 2rem auto;
}

.fetch-users {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.fetch-users:hover {
  background-color: #369970;
}

.loading {
  color: #999;
  margin: 1rem;
}

.error {
  color: red;
  margin: 1rem;
}

.user-table {
  margin: 2rem auto;
  border-collapse: collapse;
  width: 80%;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.user-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table tr:hover {
  background-color: #ddd;
}
</style>

