import Keycloak from "keycloak-js";

const isAuthEnabled = process.env.VUE_APP_AUTH_ENABLED === "true";

const keycloakInstance = isAuthEnabled
    ? new Keycloak({
          url: "https://auth.camelcase.club",
          realm: "demo-realm",
          clientId: "static-app",
      })
    : {
          init: () => Promise.resolve(),
          authenticated: true,
          token: "mock-token",
          logout: () => console.log("Mock logout"),
          updateToken: () => Promise.resolve(),
      };

export default keycloakInstance;
