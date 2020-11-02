'use restrict';

const express = require('express')
const router = express.Router()
const controller = require('~control/vehicle.controller')

router.get('/:id?', controller.get )
router.post('/', controller.create )
router.put('/:id', controller.update )
router.delete('/:id', controller.delete )

module.exports = router