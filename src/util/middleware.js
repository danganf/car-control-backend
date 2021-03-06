'use restrict';

const { validationResult } = require('express-validator')
const baseController = require('~control/contract/base.controller')
const i18n = require("i18n")

const control = new baseController()

const validatorRequest = (req,res,next) => { 
    let errorValidation = validationResult(req)
    if ( errorValidation.errors.length > 0 ) {
        return control.fail(res, i18n.__('validate.error'), errorValidation.array())
    } else {
        next()
    }
}

module.exports = {
    validatorRequest
}