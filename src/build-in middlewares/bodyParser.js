/**
 * This does not handle multipart bodies, due to their complex and typically large nature.
 * This module provides the following parsers:
 * JSON body parser
 * Raw body parser
 * Text body parser
 * URL-encoded form body parser
 */
const bodyParser = {
  /**
   * parse application/x-www-form-urlencoded
   * This functions doesn't take any arguement. Here passing options has been avoided to avoid complexity.
   * @returns {Function}
   */
  urlencoded: function () {
    return function urlencodedParser(req, res, next) {
      const reqMethod = req.method.toUpperCase();
      if (
        reqMethod === "POST" ||
        reqMethod === "PUT" ||
        reqMethod === "PATCH"
      ) {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });

        req.on("end", () => {
          if (
            req.headers["content-type"] === "application/x-www-form-urlencoded"
          ) {
            // Parse URL-encoded form data
            const urlencodedData = decodeURIComponent(data);
            const urlencodedParams = new URLSearchParams(urlencodedData);
            req.body = Object.fromEntries(urlencodedParams);
            // Call the next() function to continue the request handling
            next();
          }
        });
      } else {
        // For other HTTP methods (e.g., GET, DELETE), simply call next() without parsing data
        next();
      }
    };
  },
  /**
   * parse application/json
   * This functions doesn't take any arguement. Here passing options has been avoided to avoid complexity.
   * @returns {Function}
   */

  json: function () {
    return function jsonParser(req, res, next) {
      const reqMethod = req.method.toUpperCase();
      if (
        reqMethod === "POST" ||
        reqMethod === "PUT" ||
        reqMethod === "PATCH"
      ) {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });

        req.on("end", () => {
          if (req.headers["content-type"] === "application/json") {
            // Parse JSON data
            try {
              req.body = JSON.parse(data);
              console.log(req.body);
              next();
            } catch (error) {
              res.statusCode = 400;
              res.end("Invalid JSON payload");
            }
          }
        });
      } else {
        next();
      }
    };
  },
};

module.exports = bodyParser;
