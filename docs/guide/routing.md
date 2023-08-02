---
title: Routing
---

# Routing

Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.

You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. For a full list, see [app.METHOD](/api_reference.html#app-method-path-callback-callback). You can also use [app.all()](../api_reference.md#app-all-path-callback-callback) to handle all HTTP methods and [app.use()](../api_reference.html#app-use-path-callback-callback) to specify middleware as the callback function (See [Using middleware](./using_middleware.md) for details).

These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.

The following code is an example of a very basic route.

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

## Route methods

A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.

The following code is an example of routes that are defined for the GET and the POST methods to the root of the app.

```js
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

Express supports methods that correspond to all HTTP request methods: get, post, and so on. For a full list, see [app.METHOD](../api_reference.html#app-method-path-callback-callback).

There is a special routing method, app.all(), used to load middleware functions at a path for all HTTP request methods. For example, the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the [app.METHOD](../api_reference.html#app-method-path-callback-callback).


```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

## Route paths

