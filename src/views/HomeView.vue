<template>
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
</style>

