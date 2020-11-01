'use restrict';

const { body, validationResult } = require('express-validator')
const control = require('~control/contract/base.controller')
const i18n = require("i18n")

exports.verify = [
    body('name')
    .exists().withMessage(i18n.__('validate.exists', {name: 'nome'}))
    .isAlphanumeric().withMessage(i18n.__('validate.alpha-numeric', {name: 'nome'}))
    .isLength({min: 1 , max: 50}).withMessage(i18n.__('validate.length', {name: 'nome'}))
    .trim(),
    (req,res,next) => { 
        let errorValidation = validationResult(req)
        if ( errorValidation.errors.length > 0 ) {
            return control.fail(res, i18n.__('validate.error'), errorValidation.array())
        } else {
            next()
        }
    }
];