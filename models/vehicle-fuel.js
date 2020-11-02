"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class VehicleFuel extends Model {
    static associate(models) {}
  }
  VehicleFuel.init(
    {
      fuel_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      vehicle_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      size: DataTypes.DECIMAL(10,2)
    },
    {
      sequelize,
      tableName: "vehicle-fuel",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  VehicleFuel.removeAttribute('id');
  VehicleFuel.associate = function(models) {
    VehicleFuel.belongsTo(models.Vehicle, {foreignKey: 'vehicle_id'})
    VehicleFuel.belongsTo(models.Fuel, {foreignKey: 'fuel_id'})
  };
  return VehicleFuel;
};
