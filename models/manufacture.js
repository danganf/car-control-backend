"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Manufacture extends Model {
    static associate(models) {}
  }
  Manufacture.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "manufacture",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return Manufacture;
};
