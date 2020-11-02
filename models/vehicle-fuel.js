"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VehicleFuel extends Model {
    static associate(models) {}
  }
  VehicleFuel.init(
    {
      FuelId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'fuel_id'
      },
      VehicleId: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        field: 'vehicle_id'
      },
      size: DataTypes.DECIMAL(10,2)
    },
    {
      sequelize,
      tableName: "vehicle_fuel",
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  VehicleFuel.removeAttribute('id');
  VehicleFuel.associate = function(models) {
    VehicleFuel.belongsTo(models.Vehicle, {foreignKey: 'VehicleId', as: 'vehicle'})
    VehicleFuel.belongsTo(models.Fuel, {foreignKey: 'FuelId', as: 'fuel'})
  };
  return VehicleFuel;
};
