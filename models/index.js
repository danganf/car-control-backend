'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const models = [];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

glob.sync(`${__dirname}/*.js`).forEach((model) => {
  const modelname = path.basename(model);
  if (modelname !== 'index.js') {
    models.push(require(`${__dirname}/${modelname}`));
  }

  models.forEach((module) => {
    const sequelizeModel = module(sequelize, Sequelize);
    db[sequelizeModel.name] = sequelizeModel;
  });
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
