# demo-app

A Vue.js single-page application demonstrating secure authentication with Keycloak and modern frontend development practices.

<img src="src/assets/app.gif" width="600"/>

## Features

- **🔐 Secure Authentication**: OAuth 2.0 + PKCE via Keycloak
- **⚡ Modern Stack**: Vue 3, Vuetify Material Design
- **🛠️ Developer Experience**: Auth toggle for development mode
- **📱 Responsive Design**: Mobile-first UI

## Tech Stack

- Vue 3 with Composition API
- Vuetify Material Design components
- Keycloak JS with PKCE authentication
- Deployed as static site to AWS S3

## Related Projects

- **Backend API**: [todo-service](https://github.com/mm-camelcase/todo-service) - Spring Boot REST API
- **Infrastructure**: [aws-infra-demo](https://github.com/mm-camelcase/aws-infra-demo) - AWS infrastructure and deployment
- **Keycloak Setup**: [Keycloak configuration guide](https://github.com/mm-camelcase/aws-infra-demo/tree/main/docs/05-keycloak-init) - Complete setup instructions

## Setup

```bash
npm install
npm run serve    # Development with auth disabled
npm run build    # Production build
npm run lint     # run linting
```

## Environment Configuration

**Development** (`.env.local`):
```bash
VUE_APP_AUTH_ENABLED=false
```

**Production** (`.env.production`):
```bash
VUE_APP_AUTH_ENABLED=true
VUE_APP_KEYCLOAK_URL=https://auth.camelcase.club
VUE_APP_KEYCLOAK_REALM=demo-realm
VUE_APP_KEYCLOAK_CLIENT_ID=static-app
```

## Authentication Flow

- **Development**: Authentication disabled for rapid development
- **Production**: Full OAuth 2.0 + PKCE flow via Keycloak
- **Security**: PKCE prevents authorization code interception attacks
- **Token Management**: Automatic refresh with secure session storage

