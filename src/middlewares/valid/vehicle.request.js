'use restrict';

const { body } = require('express-validator')
const {validatorRequest} = require('~/util/middleware')
const i18n = require("i18n")

exports.verify = [
    body('user_id')
    .exists().withMessage(i18n.__('validate.exists', {name: 'user_id'}))
    .notEmpty().withMessage(i18n.__('validate.not-empty', {name: 'user_id'}))
    .isUUID().withMessage(i18n.__('validate.uid', {name: 'user_id'}))
    .trim(),
    
    body('type_id')
    .exists().withMessage(i18n.__('validate.exists', {name: 'type_id'}))
    .notEmpty().withMessage(i18n.__('validate.not-empty', {name: 'type_id'}))
    .isUUID().withMessage(i18n.__('validate.uid', {name: 'type_id'}))
    .trim(),
    
    body('manufacture_id')
    .exists().withMessage(i18n.__('validate.exists', {name: 'manufacture_id'}))
    .notEmpty().withMessage(i18n.__('validate.not-empty', {name: 'manufacture_id'}))
    .isUUID().withMessage(i18n.__('validate.uid', {name: 'manufacture_id'}))
    .trim(),
    
    body('fuels')
    .exists().withMessage(i18n.__('validate.exists', {name: 'fuels'}))
    .notEmpty().withMessage(i18n.__('validate.not-empty', {name: 'fuels'}))
    .isArray({min:1}).withMessage(i18n.__('validate.array', {name: 'fuels'})),
    
    body('template').exists().withMessage(i18n.__('validate.exists', {name: 'template'})).trim(),
    body('year').exists().withMessage(i18n.__('validate.exists', {name: 'year'})).trim(),
    body('odometer').exists().withMessage(i18n.__('validate.exists', {name: 'odometer'})).trim(),
    body('chassi').exists().withMessage(i18n.__('validate.exists', {name: 'chassi'})).trim(),
    body('renavam').exists().withMessage(i18n.__('validate.exists', {name: 'renavam'})).trim(),
    body('obs').exists().withMessage(i18n.__('validate.exists', {name: 'obs'})).trim(),

    validatorRequest
];