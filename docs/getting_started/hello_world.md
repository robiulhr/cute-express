---
title: Hello World
---

# Hello World
<hr>


:::info
Embedded below is essentially the simplest Cute Express app you can create.
:::

```js
const cuteExpress = require('cute-express')
const app = cuteExpress()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

This app starts a server and listens on port `3000` for connections. The app responds with “Hello World!” for requests to the root URL (`/`) or route. For every other path, it will respond with a 404 Not Found.

## Running Locally

First create a directory named `myapp`, change to it and run npm init. Then install cute-express as a dependency, as per the [installation guide](./installing.md).

In the `myapp` directory, create a file named `app.js` and copy in the code from the example above.


:::info
The req (request) and res (response) are the exact same objects that Node provides, so you can invoke req.pipe(), req.on('data', callback), and anything else you would do without Cute Express involved.
:::

Run the app with the following command:

```
$ node app.js
```

Then, load `http://localhost:3000/` in a browser to see the output.

