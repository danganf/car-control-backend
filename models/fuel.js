"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fuel extends Model {
    static associate(models) {}
  }
  Fuel.init(
    {
      id: DataTypes.UUID,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Fuel",
    }
  );
  return Fuel;
};
