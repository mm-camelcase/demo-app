import Keycloak from "keycloak-js";

// Create a Keycloak instance with your configuration
const keycloak = new Keycloak({
  url: "https://auth.camelcase.club", // Keycloak base URL
  realm: "demo-realm", // Keycloak realm name
  clientId: "static-app", // Keycloak client ID
  //clientSecret: "AYyxGdiab7SoxrGCbZO1r2akiWsndDPC"
});

export default keycloak;
