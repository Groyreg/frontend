# 🤖 `FRONTEND` [![Build Status](https://travis-ci.com/steklopod/frontend.svg?branch=master)](https://travis-ci.com/steklopod/frontend)

## API documentation: [swagger](https://colaba.online/api/swagger-ui.html)

### [CSS: Vuetify](https://vuetifyjs.com/ru/getting-started/quick-start)

### [JS: Nuxt js](https://github.com/nuxt/nuxt.js)

### Test API (without authorization):
> `/api` - context path for all routes [_example_: https://host/api/pangrammas/by]

#### GET:

| URI                        | Responce Type | Example                            |
| :------------------------: | :-----------: | :--------------------------------: | 
| `/guest/{username}`        | boolean       |  true                              |
| `/pangrammas/hello`        | string        |  "hello"                           |
| `/guest/{username}`        | boolean       |  "hello"                           |
| `/pangrammas/by`           | [string]      |  ["hello", hello"]                 |
| `/errors/codes`            | [string]      |  ["NOT_FOUND"]                     |
| `/errors`                  | exception     |  "Error message ☣️"                |


___
#### Plugins:

* [npm-check-updates](https://www.npmjs.com/package/npm-check-updates):

**Upgrade npm dependencies:**

1. Npm check updates:
```shell script
ncu -u
```
2. Install them:

```shell script
npm install
```
