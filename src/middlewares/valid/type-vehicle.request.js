'use restrict';

const { body } = require('express-validator')
const {validatorRequest} = require('~/util/middleware')
const i18n = require("i18n")

exports.verify = [
    body('name')
    .exists().withMessage(i18n.__('validate.exists', {name: 'nome'}))
    .notEmpty().withMessage(i18n.__('validate.not-empty', {name: 'descrição'}))
    .isLength({min: 1 , max: 50}).withMessage(i18n.__('validate.length', {name: 'nome'}))
    .trim(),

    body('wheels')
    .exists().withMessage(i18n.__('validate.exists', {name: 'descrição'}))
    .notEmpty().withMessage(i18n.__('validate.not-empty', {name: 'descrição'}))
    .isInt().withMessage(i18n.__('validate.integer', {name: 'descrição'}))
    .trim(),

    validatorRequest
];