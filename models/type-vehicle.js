"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TypeVehicle extends Model {
    static associate(models) {}
  }
  TypeVehicle.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      wheels: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "type_vehicle",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return TypeVehicle;
};
