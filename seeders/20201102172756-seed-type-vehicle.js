'use strict';

const {CON_LANG, DATE_TIME_ZONE} = require('../src/configs/config-default');
const { v4: uuidv4 } = require('uuid');

const dateTime = (new Date()).toLocaleString(CON_LANG, { timeZone: DATE_TIME_ZONE })

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('type_vehicle', [
        
        {id: uuidv4(), name: 'Carro', wheels: 4, created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Moticicleta', wheels: 2, created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Caminhão 6x2', wheels: 6, created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Caminhão 8x2', wheels: 8, created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Caminhão 6x4', wheels: 6, created_at: dateTime, updated_at: dateTime},

    ], {});
 },

 down: async (queryInterface, Sequelize) => {
   
   await queryInterface.bulkDelete('type_vehicle', null, {});

 }
};
