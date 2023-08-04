---
title: Routing
---

# Routing

Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.

You define routing using methods of the Tiny Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. For a full list, see [app.METHOD](/api_reference.html#app-method-path-callback-callback). You can also use [app.all()](../api_reference.md#app-all-path-callback-callback) to handle all HTTP methods and [app.use()](../api_reference.html#app-use-path-callback-callback) to specify middleware as the callback function (See [Using middleware](./using_middleware.md) for details).

These routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments. With multiple callback functions, it is important to provide next as an argument to the callback function and then call next() within the body of the function to hand off control to the next callback.

The following code is an example of a very basic route.

```js
const tinyExpress = require("tiny-express");
const app = tinyExpress();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});
```

## Route methods

A route method is derived from one of the HTTP methods, and is attached to an instance of the tiny express class.

The following code is an example of routes that are defined for the GET and the POST methods to the root of the app.

```js
// GET method route
app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});
```

Tiny Express supports methods that correspond to all HTTP request methods: get, post, and so on. For a full list, see [app.METHOD](../api_reference.html#app-method-path-callback-callback).

There is a special routing method, app.all(), used to load middleware functions at a path for all HTTP request methods. For example, the following handler is executed for requests to the route “/secret” whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the [app.METHOD](../api_reference.html#app-method-path-callback-callback).

```js
app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});
```

## Route paths

### Route parameters

## Route handlers

You can provide multiple callback functions that behave like [middleware](http://localhost:5173/guide/using_middleware.html) to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.

A single callback function can handle a route. For example:

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

More than one callback function can handle a route (make sure you specify the next object). For example:

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

An array of callback functions can handle a route. For example:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

A combination of independent functions and arrays of functions can handle a route. For example:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```

## Response methods


## app.route()

You can create chainable route handlers for a route path by using app.route(). Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos. For more information about routes, see: [Router() documentation](http://localhost:5173/api_reference/api_reference_1.x.html#router).

Here is an example of chained route handlers that are defined by using app.route().

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```



## tinyExpress.Router

Use the tinyExpress.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

Create a router file named birds.js in the app directory, with the following content:


```js
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

Then, load the router module in the app:

```js
const birds = require('./birds')

// ...

app.use('/birds', birds)
```

The app will now be able to handle requests to /birds and /birds/about, as well as call the timeLog middleware function that is specific to the route.

