'use restrict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/fuel.controller');

router.get('/', controller.getAll );
//router.put('/:id/sold', controller.putSold );

module.exports = router;