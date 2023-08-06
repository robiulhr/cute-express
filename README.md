# Cute Express

Cute Express is a custom implementation of the popular Node.js web application framework Express js.

Fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en).

```js
const cuteExpress = require('cute-express')
const app = cuteExpress()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```

## Installation

This is a [Node.js](https://nodejs.org/en) module available through the npm registry.

Before installing, [download and install Node.js](https://nodejs.org/en/download). Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a package.json first with the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally):

```bash
$ npm install cute-express
```

Follow our [installing guide](https://robiulhr.github.io/cute-express/getting_started/installing.html) for more information.

## Features

- Robust routing

- HTTP helpers (redirection, response, request etc)

- Content negotiation

- Executable for generating applications quickly

## Docs

- [Website and Documentation](https://robiulhr.github.io/cute-express/)

## License

[MIT](./LICENSE)