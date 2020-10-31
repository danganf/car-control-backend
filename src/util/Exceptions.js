class Exceptions extends Error {
    constructor(name, message){
        super(message);
        this.name = name;
        this.detail = message;
        this.status = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = Exceptions;
