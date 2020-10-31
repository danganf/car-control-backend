'use strict';

const {setPassword} = require('../src/util/pass');
const {CON_LANG, DATE_TIME_ZONE} = require('../src/configs/config-default');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('user', [{
        id: uuidv4(),
        name: 'Daniel Azevedo Guimarães',
        email: 'danielazevedo2k12@gmail.com',
        password: setPassword('admin123'),
        created_at: (new Date()).toLocaleString(CON_LANG, { timeZone: DATE_TIME_ZONE }),
        updated_at: (new Date()).toLocaleString(CON_LANG, { timeZone: DATE_TIME_ZONE }),
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('user', null, {});

  }
};
