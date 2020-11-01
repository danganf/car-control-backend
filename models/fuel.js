"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Fuel extends Model {
    static associate(models) {}
  }
  Fuel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fuel",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Fuel;
};
