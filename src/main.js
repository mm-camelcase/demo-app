import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from "./keycloak";

// const app = createApp(App);
// app.use(router);
// app.mount('#app');

keycloak
  .init({
    onLoad: "login-required", // Require login before the app loads
    //checkLoginIframe: false, // Optional: Disable iframe checking for simplicity
    flow: "standard",
    //clientSecret: "AYyxGdiab7SoxrGCbZO1r2akiWsndDPC", // Add client secret for confidential clients
  })
  .then(() => {
    const app = createApp(App);
    app.use(router);
    app.provide("keycloak", keycloak); // Provide the Keycloak instance globally
    app.mount("#app");
  })
  .catch((err) => {
    console.error("Failed to initialize Keycloak", err);
  });

