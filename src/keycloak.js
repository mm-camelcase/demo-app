import Keycloak from "keycloak-js";

// Create a Keycloak instance with your configuration
const keycloak = new Keycloak({
  url: "http://auth.camelcase.club", // Keycloak base URL
  realm: "my-realm", // Keycloak realm name
  clientId: "static-app", // Keycloak client ID
});

export default keycloak;
