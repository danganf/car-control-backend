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
      tableName: "fuel",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  Fuel.associate = function(models) {
    Fuel.belongsToMany(models.Vehicle, {through: 'VehicleFuel', foreignKey: 'vehicle_id', as: 'vehicles'})
  };
  return Fuel;
};
