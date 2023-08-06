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

This is a built-in middleware function in Tiny Express. It parses incoming requests with JSON payloads.

Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

### tinyExpress.raw(options)

This is a built-in middleware function in Tiny Express. It parses incoming request payloads into a Buffer.

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

This is a built-in middleware function in Tiny Express. It parses incoming requests with urlencoded payloads.

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

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | '/' (root path) |
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

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

For more information, see the [routing guide](/guide/routing.html).

**Example**

```js
app.get("/", function (req, res) {
  res.send("GET request to homepage");
});
```

### app.listen(port,host,callback)

Binds and listens for connections on the specified host and port. This method is identical to Node’s [http.Server.listen()](https://nodejs.org/api/http.html#http_server_listen).

The default `host` value is `localhost`. If the host is not defined the `localhost` will be applied as the `host` value.

```js
var express = require("express");
var app = express();
app.listen(3000);
```

The app returned by `express()` is in fact a JavaScript Function, designed to be passed to Node’s HTTP servers as a callback to handle requests. This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, as the app does not inherit from these (it is simply a callback):

```js
var express = require("express");
var https = require("https");
var http = require("http");
var app = express();

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

### app.METHOD(path, callback [, callback ...])

Routes an HTTP request, where METHOD is the HTTP method of the request, such as `GET`, `PUT`, `POST`, and so on, in lowercase. Thus, the actual methods are `app.get()`, `app.post()`, `app.put()`, and so on. See [Routing methods](/api_reference/api_reference_1.x.html#routing-methods) below for the complete list.

**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

#### Routing methods

Tiny Express supports the following routing methods corresponding to the HTTP methods of the same names:

- delete

- get

- patch

- post

- put

The API documentation has explicit entries only for the most popular HTTP methods app.get(), app.post(), app.put(), and app.delete().

The method, app.all(), is not derived from any HTTP method and loads middleware at the specified path for all HTTP request methods. For more information, see [app.all](/api_reference/api_reference_1.x.html#app-all-path-callback-callback).

For more information on routing, see the [routing guide](/guide/routing.html).

### app.post(path, callback [, callback ...])

Routes HTTP POST requests to the specified path with the specified callback functions. For more information, see the [routing guide](/guide/routing.html).

**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

**Example**

```js
app.post("/", function (req, res) {
  res.send("POST request to homepage");
});
```

### app.put(path, callback [, callback ...])

Routes HTTP PUT requests to the specified path with the specified callback functions.

**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

**Example**

```js
app.put("/", function (req, res) {
  res.send("PUT request to homepage");
});
```

### app.route(path)

Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware. Use app.route() to avoid duplicate route names (and thus typo errors).

```js
var app = tinyExpress();

app
  .route("/events")
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
  })
  .get(function (req, res, next) {
    res.json({});
  })
  .post(function (req, res, next) {
    // maybe add a new event...
  });
```

### app.use([path,] callback [, callback...])

Mounts the specified [middleware](/guide/using_middleware.html) function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

**Arguments**

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| path     | The path for which the middleware function is invoked; can be any of: <br><li>A string representing a path.</li><li>A path pattern.</li><li>A regular expression pattern to match paths.</li><br>For examples, see [Path examples](/api_reference/api_reference_1.x.html#path-examples).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | '/' (root path) |
| callback | Callback functions; can be:<br><li>A middleware function.</li><li>A series of middleware functions (separated by commas).</li><li>An array of middleware functions.</li><li>A combination of all of the above.</li><br>You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.<br><br>Since [router](/api_reference/api_reference_1.x.html#router) and [app](/api_reference/api_reference_1.x.html#application) implement the middleware interface, you can use them as you would any other middleware function.<br><br>For examples, see [Middleware callback function examples](/api_reference/api_reference_1.x.html#path-examples-1). | None            |

**Description**

A route will match any path that follows its path immediately with a “/”. For example: app.use('/apple', ...) will match “/apple”, “/apple/images”, “/apple/images/news”, and so on.

Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
For example, this middleware function will be executed for every request to the app:

```js
app.use(function (req, res, next) {
  console.log("Time: %d", Date.now());
  next();
});
```

Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.

```js
// this middleware will not allow the request to go beyond it
app.use(function (req, res, next) {
  res.send("Hello World");
});

// requests will never reach this route
app.get("/", function (req, res) {
  res.send("Welcome");
});
```

#### Error-handling middleware

#### Path examples

The following table provides some simple examples of valid path values for mounting middleware.

<table>
<tr>
<td> Type </td> <td> Example </td>
</tr>
<tr>
<td>
Path

</td>
<td>
This will match paths starting with /abcd:

```js
app.use('/abcd', function (req, res, next) {
  next()
})
```
</td>
</tr>
<tr>
<td>
Path Pattern	

</td>
<td>
This will match paths starting with /abcd and /abd:

```js
app.use('/abc?d', function (req, res, next) {
  next()
})
```

This will match paths starting with /abcd, /abbcd, /abbbbbcd, and so on:

```js
app.use('/ab+cd', function (req, res, next) {
  next()
})
```

This will match paths starting with /abcd, /abxcd, /abFOOcd, /abbArcd, and so on:

```js
app.use('/ab*cd', function (req, res, next) {
  next()
})
```

This will match paths starting with /ad and /abcd:

```js
app.use('/a(bc)?d', function (req, res, next) {
  next()
})
```
</td>
</tr>
<tr>
<td>
Regular Expression	


</td>
<td>
This will match paths starting with /abc and /xyz:

```js
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next()
})
```
</td>
</tr>
</table>

#### Middleware callback function examples

The following table provides some simple examples of middleware functions that can be used as the callback argument to app.use(), app.METHOD(), and app.all(). Even though the examples are for app.use(), they are also valid for app.use(), app.METHOD(), and app.all().

<table>
<tr>
<td> Usage </td> <td> Example </td>
</tr>
<tr>
<td>
Single Middleware	


</td>
<td>
You can define and mount a middleware function locally.

```js
app.use(function (req, res, next) {
  next()
})
```

A router is valid middleware.

```js
var router = tinyExpress.Router()
router.get('/', function (req, res, next) {
  next()
})
app.use(router)
```
An Tiny Express app is valid middleware.

```js
var subApp = tinyExpress()
subApp.get('/', function (req, res, next) {
  next()
})
app.use(subApp)
```
</td>
</tr>
<tr>
<td>
Series of Middleware	

</td>
<td>
You can specify more than one middleware function at the same mount path.

```js
var r1 = tinyExpress.Router()
r1.get('/', function (req, res, next) {
  next()
})

var r2 = tinyExpress.Router()
r2.get('/', function (req, res, next) {
  next()
})

app.use(r1, r2)
```

</td>
</tr>
<tr>
<td>
Array

</td>
<td>
Use an array to group middleware logically.


```js
var r1 = tinyExpress.Router()
r1.get('/', function (req, res, next) {
  next()
})

var r2 = tinyExpress.Router()
r2.get('/', function (req, res, next) {
  next()
})

app.use([r1, r2])
```
</td>
</tr>
<tr>
<td>
Combination

</td>
<td>
You can combine all the above ways of mounting middleware.

```js
function mw1 (req, res, next) { next() }
function mw2 (req, res, next) { next() }

var r1 = tinyExpress.Router()
r1.get('/', function (req, res, next) { next() })

var r2 = tinyExpress.Router()
r2.get('/', function (req, res, next) { next() })

var subApp = tinyExpress()
subApp.get('/', function (req, res, next) { next() })

app.use(mw1, [mw2, r1, r2], subApp)
```
</td>
</tr>
</table>

## Request

The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In this documentation and by convention, the object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you’re working.

For example:

```js
app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})
```

But you could just as well have:

```js
app.get('/user/:id', function (request, response) {
  response.send('user ' + request.params.id)
})
```

The req object is an enhanced version of Node’s own request object and supports all [built-in fields and methods](https://nodejs.org/api/http.html#http_class_http_incomingmessage).

**Properties**

### req.body

Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as tinyExpress.json() or tinyExpress.urlencoded().

:::danger
As req.body’s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, req.body.foo.toString() may fail in multiple ways, for example foo may not be there or may not be a string, and toString may not be a function and instead a string or other user-input.
:::

The following example shows how to use body-parsing middleware to populate req.body.

```js
var tinyExpress = require('tiny-express')

var app = tinyExpress()

app.use(tinyExpress.json()) // for parsing application/json
app.use(tinyExpress.urlencoded()) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})
```

## Response

**Methods**

### res.end([data])

Ends the response process. This method actually comes from Node core, specifically the [response.end() method of http.ServerResponse](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback).

Use to quickly end the response without any data. If you need to respond with data, instead use methods such as [res.send()](/api_reference/api_reference_1.x.html#res-send-body) and [res.json()](/api_reference/api_reference_1.x.html#res-json-body).

```js
res.end()
res.status(404).end()
```

### res.json([body])

Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.

```js
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })
```


### res.redirect(status, path)

Redirects to the URL derived from the specified path, with specified status, a positive integer that corresponds to an [HTTP status code](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) . If not specified, status defaults to “302 “Found”.

```js
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
```

Redirects can be a fully-qualified URL for redirecting to a different site:

```js
res.redirect('http://google.com')
```

Redirects can be relative to the root of the host name. For example, if the application is on http://example.com/admin/post/new, the following would redirect to the URL http://example.com/admin:

```js
res.redirect('/admin')
```


### res.send([body])

Sends the HTTP response.

The body parameter can be a String, an object, Boolean, or an Array. For example:

```js
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })
```

### res.set(field, value)

Sets the response’s HTTP header field to value. To set multiple fields at once, pass an object as the parameter.

```js
res.set('Content-Type', 'text/plain')
```

### res.status(code)

Sets the HTTP status for the response. It is a chainable alias of Node’s [response.statusCode](https://nodejs.org/api/http.html#http_response_statuscode).

```js
res.status(403).end()
res.status(400).send('Bad Request')
res.status(404).sendFile('/absolute/path/to/404.png')
```


## Router

A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to [app.use()](/api_reference/api_reference_1.x.html#app-use-path-callback-callback) or as the argument to another router’s [use()](/api_reference/api_reference_1.x.html#router-use-path-function-function) method.

The top-level express object has a [Router()](/api_reference/api_reference_1.x.html#tinyexpress-router) method that creates a new router object.

Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application. For example:

```javascript
// invoked for any requests passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function (req, res, next) {
  // ..
})
```

You can then use a router for a particular root URL in this way separating your routes into files or even mini-apps.

```js
// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router)
```

### router.all(path, [callback, ...] callback)

This method is just like the router.METHOD() methods, except that it matches all HTTP methods (verbs).

This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches. For example, if you placed the following route at the top of all other route definitions, it would require that all routes from that point on would require authentication, and automatically load a user. Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next() to continue matching subsequent routes.

```js
router.all('*', requireAuthentication, loadUser)
```

Or the equivalent:

```js
router.all('*', requireAuthentication)
router.all('*', loadUser)
```

Another example of this is white-listed “global” functionality. Here the example is much like before, but it only restricts paths prefixed with “/api”:

```js
router.all('/api/*', requireAuthentication)
```

### router.METHOD(path, [callback, ...] callback)

The router.METHOD() methods provide the routing functionality in Express, where METHOD is one of the HTTP methods, such as GET, PUT, POST, and so on, in lowercase. Thus, the actual methods are router.get(), router.post(), router.put(), and so on.

You can provide multiple callbacks, and all are treated equally, and behave just like middleware, except that these callbacks may invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to perform pre-conditions on a route then pass control to subsequent routes when there is no reason to proceed with the route matched.

The following snippet illustrates the most simple route definition possible. Express translates the path strings to regular expressions, used internally to match incoming requests. Query strings are not considered when performing these matches, for example “GET /” would match the following route, as would “GET /?name=tobi”.

```js
router.get('/', function (req, res) {
  res.send('hello world')
})
```

You can also use regular expressions—useful if you have very specific constraints, for example the following would match “GET /commits/71dbb9c” as well as “GET /commits/71dbb9c..4c084f9”.


```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
  var from = req.params[0]
  var to = req.params[1] || 'HEAD'
  res.send('commit range ' + from + '..' + to)
})
```

### router.route(path)

Returns an instance of a single route which you can then use to handle HTTP verbs with optional middleware. Use router.route() to avoid duplicate route naming and thus typing errors.

Building on the router.param() example above, the following code shows how to use router.route() to specify various HTTP method handlers.

```js
var router = express.Router()

router.param('user_id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  }
  next()
})

router.route('/users/:user_id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(function (req, res, next) {
    res.json(req.user)
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })
```

This approach re-uses the single /users/:user_id path and adds handlers for various HTTP methods.

:::info
NOTE: When you use router.route(), middleware ordering is based on when the route is created, not when method handlers are added to the route. For this purpose, you can consider method handlers to belong to the route to which they were added.
:::

### router.use([path], [function, ...] function)

Uses the specified middleware function or functions, with optional mount path path, that defaults to “/”.

This method is similar to [app.use()](/api_reference/api_reference_1.x.html#app-use-path-callback-callback). A simple example and use case is described below. See [app.use()](/api_reference/api_reference_1.x.html#app-use-path-callback-callback) for more information.

Middleware is like a plumbing pipe: requests start at the first middleware function defined and work their way “down” the middleware stack processing for each path they match.


```js
var express = require('express')
var app = express()
var router = express.Router()

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  next()
})

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function (req, res, next) {
  // ... maybe some additional /bar logging ...
  next()
})

// always invoked
router.use(function (req, res, next) {
  res.send('Hello World')
})

app.use('/foo', router)

app.listen(3000)
```

The “mount” path is stripped and is not visible to the middleware function. The main effect of this feature is that a mounted middleware function may operate without code changes regardless of its “prefix” pathname.

The order in which you define middleware with router.use() is very important. They are invoked sequentially, thus the order defines middleware precedence. For example, usually a logger is the very first middleware you would use, so that every request gets logged.


```js
var logger = require('morgan')
var path = require('path')

router.use(logger())
router.use(function (req, res) {
  res.send('Hello')
})
```

The router.use() method also supports named parameters so that your mount points for other routers can benefit from preloading using named parameters.

NOTE: Although these middleware functions are added via a particular router, when they run is defined by the path they are attached to (not the router). Therefore, middleware added via one router may run for other routers if its routes match. For example, this code shows two different routers mounted on the same path:

```js
var authRouter = express.Router()
var openRouter = express.Router()

authRouter.use(require('./authenticate').basic(usersdb))

authRouter.get('/:user_id/edit', function (req, res, next) {
  // ... Edit user UI ...
})
openRouter.get('/', function (req, res, next) {
  // ... List users ...
})
openRouter.get('/:user_id', function (req, res, next) {
  // ... View user ...
})

app.use('/users', authRouter)
app.use('/users', openRouter)
```

Even though the authentication middleware was added via the authRouter it will run on the routes defined by the openRouter as well since both routers were mounted on /users. To avoid this behavior, use different paths for each router.