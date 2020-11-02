'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const repo = {};

const camelCase = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    try{ 
        const name = camelCase(file.replace('.js', '').replace('.', ' ').replace('-', ' '))
        repo[name] = require(path.join(__dirname, file));
    } catch(err){

    }
  });

module.exports = repo;
