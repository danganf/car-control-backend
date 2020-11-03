const app = require('~/app');
const debug  = require('debug')('nodestr:server');
const http = require('http');

const { handleError, normalizePort, onError } = require('../helpers/error');

const port = normalizePort( process.env.PORT || 3000 );
app.set( 'port', port );

const server = http.createServer( app );

app.use((err, req, res, next) => { handleError(err, res); });

server.listen( port, () => { console.log('API rodando na port ' + port); } );
server.on( 'error', onError );
server.on( 'listening', onListening );

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    debug( 'Listening on ' + bind );
}