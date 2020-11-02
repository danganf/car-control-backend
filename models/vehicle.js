"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {}
  }
  Vehicle.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: DataTypes.UUID,
      type_id: DataTypes.UUID,
      manufacture_id: DataTypes.UUID,
      template: DataTypes.STRING,
      year: DataTypes.INTEGER,
      odometer: DataTypes.INTEGER,
      chassi: DataTypes.STRING,
      renavam: DataTypes.STRING,
      obs: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "vehicle",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    Vehicle.belongsTo(models.TypeVehicle, {foreignKey: 'type_id', as: 'type_vehicle'})
    Vehicle.belongsTo(models.Manufacture, {foreignKey: 'manufacture_id', as: 'manufacture'})
    Vehicle.belongsToMany(models.Fuel, {through: 'VehicleFuel', foreignKey: 'fuel_id', as: 'fuels'})
  };
  return Vehicle;
};
