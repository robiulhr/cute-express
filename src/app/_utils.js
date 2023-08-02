const { checkWholePossitiveNumber, isFunction } = require("../globalUtils/globalUtils");


const listenHandlerInputValidator = (port, host, handler) => {
    let validatedPort = port, validatedHost = host, validatedHandler = handler
    // arguments validation
    if (!checkWholePossitiveNumber(port)) {
        throw new Error("provide a valid port number.");
    }
    // if host is absent
    if (isFunction(host)) {
        validatedHandler = host;
        validatedHost = "localhost"
    } else if (host && !isFunction(handler)) {
        throw new Error("please, provide a function as the handler.");
    }
    return {
        validatedPort, validatedHost, validatedHandler
    }
}

module.exports = {
    listenHandlerInputValidator
}