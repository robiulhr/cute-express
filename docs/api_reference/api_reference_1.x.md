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

## Methods

### tinyExpress.json([options])

## Application

### app.all(path, callback [, callback ...])

### app.use([path,] callback [, callback...])

### app.METHOD(path, callback [, callback ...])

### app.listen(port,host,callback)

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
## Request

## Response

### res.json([body])

### res.redirect([status,] path)

### res.send([body])

### res.sendStatus(statusCode)

### res.end([data] [, encoding])


## Router
