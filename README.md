# spring-react-redux-mocha-chai-mongodb
An example application that uses a Spring Framework Java backend with a React Redux
frontend.
JavaScript Tests - Mocha, Chai, Enzyme and Sinon.

- [Webpack](https://github.com/webpack/webpack) to bundle all the
  JavaScript and dependencies, plus LESS + CSS handling.
- [Babel](https://babeljs.io/) for ES6 syntax, using Babel 6 with the "es2016" and "react" presets.
- [Hot module reloading
  (HMR)](https://github.com/gaearon/react-transform-hmr) of React components
- [Redux](https://github.com/rackt/redux) to manage state, both in the
  client and when rendering on the server.
- [react-router](https://github.com/rackt/react-router) for page routing,
  on client and server
- Linting integrated with Webpack via [eslint](https://github.com/MoOx/eslint-loader).

## Running the code

Execute `mvn` if you have Maven already installed. You'll need Java 1.8.x.

mvn clean install spring-boot:run

## Running the Server Tests

mvn test

## Running the FrontEnd JavaScript Tests

npm run test

