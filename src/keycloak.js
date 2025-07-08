import Keycloak from "keycloak-js";

const isAuthEnabled = process.env.VUE_APP_AUTH_ENABLED === "true";


const keycloakInstance = isAuthEnabled
    ? new Keycloak({
          url: "https://auth.camelcase.club",
          realm: "demo-realm",
          clientId: "static-app",
      })
    : {
        // Mock for development
        init: () => Promise.resolve(true),
        authenticated: true,
        token: "mock-token",
        login: () => console.log("Mock login"),
        logout: () => console.log("Mock logout"),
        updateToken: () => Promise.resolve(false),
        tokenParsed: {
            preferred_username: "dev-user",
            email: "dev@example.com",
            name: "Development User",
            given_name: "DevUser"
        }
      };

export default keycloakInstance;

