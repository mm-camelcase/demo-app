import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from "./keycloak";
// import { createVuetify } from "vuetify";
// import "vuetify/styles";
// import { aliases, mdi } from "vuetify/iconsets/mdi";

// const vuetify = createVuetify({
//   icons: {
//     defaultSet: "mdi",
//     aliases,
//     sets: {
//       mdi,
//     },
//   },
//   theme: {
//     themes: {
//       light: {
//         primary: "#1976D2",
//         secondary: "#FFC107",
//       },
//     },
//   },
// });

// Import Vuetify
// import { createVuetify } from "vuetify";
// import "vuetify/styles"; // Import Vuetify CSS
// import "@mdi/font/css/materialdesignicons.css"; // Import Material Design Icons

// // Create Vuetify instance
// const vuetify = createVuetify({
//   theme: {
//     themes: {
//       light: {
//         primary: "#1976D2",
//         secondary: "#FFC107",
//       },
//     },
//   },
// });

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure styles are loaded
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

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
    app.use(vuetify);
    app.provide("keycloak", keycloak); // Provide the Keycloak instance globally
    app.mount("#app");
  })
  .catch((err) => {
    console.error("Failed to initialize Keycloak", err);
  });

