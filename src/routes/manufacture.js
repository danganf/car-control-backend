'use restrict';

const express = require('express')
const router = express.Router()
const controller = require('~control/manufacture.controller')
const valid = require('~/middlewares/valid/manufacture.request')

router.get('/:id?', controller.get )
router.post('/', valid.verify, controller.create )
router.put('/:id', controller.update )
router.delete('/:id', controller.delete )

module.exports = router