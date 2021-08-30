# seed-ms-node

This is the seed for Node.js with Hapi.js. This should be _forked_ to create any microservice.

## Version specification
- node: v10.16.0
- TypeScript v3.5
## IDE recommendations and setup

- VSCode IDE
- Eslint vscode plugin
- Prettier vscode plugin for linting warnings (auto fix on save)
- Add the following setting in vscode settings.json 
```json
"eslint.autoFixOnSave": true
```

## Dev setup
- Install all the dependencies using `npm install`
- To run the server with watch use `npm run dev-watch`
- To run the test cases in watch mode use `npm run test-watch`
- To run the test cases without watch mode use `npm run test`
- To run docker compose `docker-compose -f docker-compose.dev.yml up -d`
- To build docker image only :
`
 npm tsc &&
 docker build -t ${your image name} .
`

## Test

- Unit Test: We are using Jest for assertion and mocking

## Git Hooks
The seed uses `husky` to enable commit hook.

### Pre commit
Whenever there is a commit, there will be check on lint, on failure commit fails.

### Pre push
Whenever there is a push, there will be check on test.


## ENV variables
- DEV: it is accessible throughout application

### Optional
- LOG_FILE: path to log file, default console log


## Misc

Swagger API is at http://localhost:8080/documentation
