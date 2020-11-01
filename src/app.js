'use strict';

require('express-group-routes')

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const paginate = require('express-paginate')
const i18n = require("i18n")
const app = express()

i18n.configure({
    locales:['ptbr','en'],
    cookie: 'gmlang',
    queryParameter: 'lang',
    defaultLocale: 'ptbr',
    objectNotation: true,
    directory: path.join(__dirname, "../locales")
});

app.use(i18n.init)

// keep this before all routes that will use pagination
app.use(paginate.middleware(20, 50))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use( bodyParser.json( { limit: '5mb' } ) )
app.use( bodyParser.urlencoded( { extended: false } ) )

// Habilita o CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-backend-token")
    res.header("Access-Control-Expose-Headers", "x-paginator-current-page, x-paginator-total-results, x-paginator-total-pages")
    next()
})

//CARREGAR ROTAS
app.use( '/', require('./routes/index') )
app.group("/v1", (router) => {
    router.use( '/fuel' , require('./routes/fuel') )
    router.use( '/manufacture' , require('./routes/manufacture') )
    router.use( '/type-vehicle' , require('./routes/type-vehicle') )
})

module.exports = app