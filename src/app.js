'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use( bodyParser.json( { limit: '5mb' } ) );
app.use( bodyParser.urlencoded( { extended: false } ) );

// Habilita o CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-backend-token");
    res.header("Access-Control-Expose-Headers", "x-paginator-current-page, x-paginator-total-results, x-paginator-total-pages");
    next();
});

//CARREGAR ROTAS
app.use( '/', require('./routes/index') );
//app.use( '/media' , require('./routes/fuel') );

module.exports = app;