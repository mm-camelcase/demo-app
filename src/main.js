import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from "./keycloak";

import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure styles are loaded
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons CSS
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

const isAuthEnabled = process.env.VUE_APP_AUTH_ENABLED === 'true';


// Clean init options for PKCE
const initOptions = isAuthEnabled ? {
    //onLoad: 'check-sso',
    onLoad: 'login-required', // Changed from 'check-sso'
    checkLoginIframe: false,
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    enableLogging: true  // Enable Keycloak's internal logging
} : {};

keycloak.init(initOptions)
    .then((authenticated) => {
        if (isAuthEnabled && authenticated) {
            console.log('✅ Authenticated with PKCE');
            // Set up token refresh
            setInterval(() => {
                keycloak.updateToken(30).catch(() => keycloak.login());
            }, 30000);
        }
        
        const app = createApp(App);
        app.use(router);
        app.use(vuetify);
        app.provide("keycloak", keycloak);
        app.mount("#app");
    })
    .catch((err) => {
        console.error("Keycloak init failed:", err);
        // Mount app anyway
        const app = createApp(App);
        app.use(router);
        app.use(vuetify);
        app.provide("keycloak", keycloak);
        app.mount("#app");
    });
        
  