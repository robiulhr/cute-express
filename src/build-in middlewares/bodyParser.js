const { isValidString } = require("../globalUtils/globalUtils")

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
        reqMethod === "GET" || reqMethod === "DELETE" || reqMethod === "POST" ||
        reqMethod === "PUT" ||
        reqMethod === "PATCH"
      ) {
        if (
          req.headers["content-type"] === "application/x-www-form-urlencoded"
        ) {
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;
          });

          req.on("end", () => {
            // Parse URL-encoded form data
            const urlencodedData = decodeURIComponent(data);
            const urlencodedParams = new URLSearchParams(urlencodedData);
            req.body = Object.fromEntries(urlencodedParams);
            // Call the next() function to continue the request handling
            next();
          });
        } else {
          /**
           *  Call the next() function to continue the request handling when the req.headers["content-type"] is not equal to "application/x-www-form-urlencoded"
           */
          next();
        }
      } else {
        /**
          *  For other HTTP methods (e.g., GET, DELETE), simply call next() without parsing data
         */
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
        reqMethod === "GET" || reqMethod === "DELETE" || reqMethod === "POST" ||
        reqMethod === "PUT" ||
        reqMethod === "PATCH"
      ) {
        if (req.headers["content-type"] === "application/json") {
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;

          });

          req.on("end", () => {
            // Parse JSON data
            try {
              req.body = JSON.parse(data);
              // Call the next() function to continue the request handling
              next();
            } catch (error) {
              res.statusCode = 400;
              res.end("Invalid JSON payload");
            }
          });
        } else {
          /**
          *  Call the next() function to continue the request handling when the req.headers["content-type"] is not equal to "application/json"
          */
          next();
        }
      } else {
        /**
         *  For other HTTP methods (e.g., GET, DELETE), simply call next() without parsing data
         */
        next();
      }
    };
  },
  /**
   * handles req.headers['content-type'] === 'text/html' and req.headers['content-type'] === 'text/plain'
   * @param {Object} options default value  { type: 'text/html' }
   * @returns {Function}
   */
  row: function (options = { type: 'text/plain' }) {
    return function (req, res, next) {
      if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        if (options?.type === 'text/html' && req.headers['content-type'] === 'text/html') {
          let data = '';

          // Listen for incoming data chunks
          req.on('data', (chunk) => {
            data += chunk;
          });

          // After all data chunks are received
          req.on('end', () => {
            req.body = data; // Assuming HTML data is sent as a string
            next();
          });
        } else {
          if (req.headers['content-type'] === 'text/plain') {
            let data = '';

            // Listen for incoming data chunks
            req.on('data', (chunk) => {
              data += chunk;
            });

            // After all data chunks are received
            req.on('end', () => {
              // Validate the data
              if (isValidString(data)) {
                req.body = data;
                next();
              } else {
                res.statusCode = 400;
                res.end('Invalid data format');
              }
            });
          } else {
            /**
          *  Call the next() function to continue the request handling when the req.headers["content-type"] is not equal to 'text/plain' and 'text/html'
          */
            next()
          }
        }
      } else {
        /**
        *  For other HTTP methods (e.g., GET, DELETE), simply call next() without parsing data
        */
        next();
      }
    }
  }
};




module.exports = bodyParser;
