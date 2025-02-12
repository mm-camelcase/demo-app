# demo-app

A simple static page app built with Vue for the purpose of deployment demos.

<img src="src/assets/app.gif" width="600"/>

- Includes an animated GIF showcasing Keycloak-based login to the app.

- In development mode, authentication is disabled.

- In production, the app is protected by Keycloak login.

- Backed by a Spring Boot Todo service. See the service here.

- Part of the AWS infrastructure deployment project. See details here.



## Project Setup
```
npm install
```

### Compiles and Hot-Reloads for Development
```
npm run serve
```

### Compiles and Minifies for Production
```
npm run build
```

### Lints and Fixes Files
```
npm run lint
```

### Customize Configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

