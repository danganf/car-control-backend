'use restrict';

const express = require('express')
const router = express.Router()
const controller = require('~control/type-vehicle.controller')
const valid = require('~/middlewares/valid/type-vehicle.request')

router.get('/:id?', controller.get )
router.post('/', valid.verify, controller.create )
router.put('/:id', valid.verify, controller.update )
router.delete('/:id', controller.delete )

module.exports = router