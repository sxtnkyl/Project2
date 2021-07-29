const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Connections extends Model {}

Connections.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'connections',
  }
);

module.exports = Connections;
