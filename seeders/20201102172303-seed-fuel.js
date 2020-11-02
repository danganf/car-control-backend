'use strict';

const {CON_LANG, DATE_TIME_ZONE} = require('../src/configs/config-default');
const { v4: uuidv4 } = require('uuid');

const dateTime = (new Date()).toLocaleString(CON_LANG, { timeZone: DATE_TIME_ZONE })

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('fuel', [
        
        {id: uuidv4(), name: 'Gasolina', description: null, unity: "litro", created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Etanol', description: null, unity: "litro", created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'GNV', description: "Gás natural", unity: "m3", created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Óleo diesel', description: null, unity: "litro", created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'Elétrico', description: null, unity: "Kwh", created_at: dateTime, updated_at: dateTime},
        {id: uuidv4(), name: 'GLP', description: "Gás liquefeito propano", unity: "litro", created_at: dateTime, updated_at: dateTime}

    ], {});
 },

 down: async (queryInterface, Sequelize) => {
   
   await queryInterface.bulkDelete('fuel', null, {});

 }
};
