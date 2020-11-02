"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "user",
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return User;
};
