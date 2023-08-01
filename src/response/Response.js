const {
  checkPureObject,
  stringIsAValidUrl,
  checkWholePossitiveNumber,
} = require("../globalUtils/globalUtils");

const response = {
  /**
   * set method sets the http header
   * @param {String} name
   * @param {String} value
   * @returns {object}
   */
  set: function (name, value) {
    this.setHeader(name, value);
    return this;
  },
  /** */
  send: function (data) {
    const isPureObj = checkPureObject(data);
    if (isPureObj) {
      this.json(data);
    } else {
      this.end(data);
    }
  },
  /**
   * status method sets the http status code
   * @param {Number} statusCode
   * @returns {object}
   */
  status: function (statusCode) {
    const isValidNumber = checkWholePossitiveNumber(statusCode);
    if (!isValidNumber) {
      throw new Error(
        "Please provide a valid statusCode as argument in res.status() method"
      );
    }
    this.statusCode = statusCode;
    return this;
  },
  /**
   * json method sends json object as response
   * @param {Object} obj
   * @returns {Object}
   */
  json: function (obj) {
    const isPureObj = checkPureObject(obj);
    if (!isPureObj) {
      const err = new Error(
        "Please provide a pure object as argument in res.json() method"
      );
      console.error(err.message);
      return;
    }
    const jsonContent = JSON.stringify(obj);
    this.set("content-type", "application/json");
    this.status(201);
    this.end(jsonContent);
    return this;
  },
  /**
   * redirects to the given path
   * @param {String} path 
   * @returns {Object}
   */
  redirect: function (path, resData) {
    const hostName = this.req.headers.host
    const url = "http://" + hostName + path
    if (!stringIsAValidUrl(url)) {
      console.error("please, provide a valid path")
      return
    }
    this.writeHead(301, { Location: url });
    this.end();
    return this
  },
};

module.exports = response;
