import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from "./keycloak";

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure styles are loaded
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'myCustomTheme',
      themes: {
        myCustomTheme: {
          dark: false,
          colors: {
            primary: '#434343', 
            secondary: '#F7F7F7', 
            accent: '#82B1FF',
            error: '#F7F7F7',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
        },
      },
    },
  });

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

