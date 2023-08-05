---
title: API Reference 1.x
---

# API Reference 1.x

<hr>

## tinyExpress()

Creates an Tiny Express application. The tinyExpress() function is a top-level function exported by the Tiny express module.

```js
var tinyExpress = require("tiny-express");
var app = tinyExpress();
```

**Methods**

### tinyExpress.json()

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.

Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

### tinyExpress.raw(options)

This is a built-in middleware function in Express. It parses incoming request payloads into a Buffer.

Returns middleware that parses all bodies as a Buffer and only looks at requests where the Content-Type header matches the type option.

A new body Buffer containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

| Property | Description                                                                                                                                           | Default      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| type     | This is used to determine what media type the middleware will parse. This option can be a string. The value can be eather 'text/plain' or 'text/html' | 'text/plain' |

### tinyExpress.Router()

Creates a new [router](/api_reference/api_reference_1.x.html#router) object.

```js
var router = tinyExpress.Router();
```

You can add middleware and HTTP method routes (such as get, put, post, and so on) to router just like an application.

For more information, see [Router](/api_reference/api_reference_1.x.html#router).

### tinyExpress.urlencoded()

This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads.

Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

## Application

The app object conventionally denotes the Tiny Express application. Create it by calling the top-level tinyExpress() function exported by the Tiny Express module:

```js
var tinyExpress = require("tiny-express");
var app = tinyExpress();

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(3000);
```

The app object has methods for

- Routing HTTP requests; see for example, [app.METHOD](/api_reference/api_reference_1.x.html#app-method-path-callback-callback) and [app.param](/api_reference/api_reference_1.x.html#app-param-name-callback).

- Configuring middleware; see [app.route](/api_reference/api_reference_1.x.html#app-route-path).

**Methods**

### app.all(path, callback [, callback ...])

This method is like the standard [app.METHOD()](/api_reference/api_reference_1.x.html#app-method-path-callback-callback) methods, except it matches all HTTP verbs.

**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of:<br><br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

**Examples**

The following callback is executed for requests to /secret whether using GET, POST, PUT, DELETE, or any other HTTP request method:

```js
app.all("/secret", function (req, res, next) {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});
```

The app.all() method is useful for mapping “global” logic for specific path prefixes or arbitrary matches. For example, if you put the following at the top of all other route definitions, it requires that all routes from that point on require authentication, and automatically load a user. Keep in mind that these callbacks do not have to act as end-points: loadUser can perform a task, then call next() to continue matching subsequent routes.

```js
app.all("*", requireAuthentication, loadUser);
```

Or the equivalent:

```js
app.all("*", requireAuthentication);
app.all("*", loadUser);
```

Another example is white-listed “global” functionality. The example is similar to the ones above, but it only restricts paths that start with “/api”:

```js
app.all("/api/*", requireAuthentication);
```

### app.delete(path, callback [, callback ...])

Routes HTTP DELETE requests to the specified path with the specified callback functions. For more information, see the [routing guide](/guide/routing.html).

**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

**Example**

```js
app.delete("/", function (req, res) {
  res.send("DELETE request to homepage");
});
```

For more information, see the [routing guide](/guide/routing.html).

### app.get(path, callback [, callback ...])

Routes HTTP GET requests to the specified path with the specified callback functions.


**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |


For more information, see the [routing guide](/guide/routing.html).

**Example**

```js
app.get('/', function (req, res) {
  res.send('GET request to homepage')
})
```

### app.listen(port,host,callback)

Binds and listens for connections on the specified host and port. This method is identical to Node’s [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen).



### app.METHOD(path, callback [, callback ...])

### app.post(path, callback [, callback ...])

### app.put(path, callback [, callback ...])

### app.route(path)

### app.use([path,] callback [, callback...])

Binds and listens for connections on the specified host and port. This method is identical to Node’s [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen).

The default `host` value is `localhost`. If the host is not defined the `localhost` will be applied as the `host` value.

```js
var tinyExpress = require("tiny-express");
var app = tinyExpress();
app.listen(3000);
```

The app returned by `tinyExpress()` is in fact a JavaScript Function, designed to be passed to Node’s HTTP servers as a callback to handle requests. This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, as the app does not inherit from these (it is simply a callback):

```js
var tinyExpress = require("tiny-express");
var https = require("https");
var http = require("http");
var app = tinyExpress();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
```

The app.listen() method returns an http.Server object and (for HTTP) is a convenience method for the following:

```js
app.listen = function () {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

#### Path examples

## Request

## Response

### res.json([body])

### res.redirect([status,] path)

### res.send([body])

### res.sendStatus(statusCode)

### res.end([data] [, encoding])

## Router
