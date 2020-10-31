class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

const normalizePort = ( val ) => {
    const port = parseInt( val, 10 );
    if( isNaN( port ) ) return val;
    if( port >= 0 ) return port;

    return false;
};

const onError = ( error ) => {
    if( error.syscall !== 'listen' ){
        throw error;
    }

    const bind = typeof error.port === 'string' ?  'Pipe ' + error.port : 'Port ' + error.port;

    switch ( error.code ) {
        case 'EACCES':
            console.error( bind + ' requires elevated privileges' );
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error( bind + ' is already in use' );
            process.exit(1);
            break;
        default:
            throw error;
    }
};

module.exports = {
    ErrorHandler,
    handleError,
    normalizePort,
    onError
};