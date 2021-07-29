const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// == User - id(pk), username, password, user_instrument(fk), user_genre(fk), content, photo_str, connections(fk),==//

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    user_instrument: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'instrument',
        key: 'id',
      },
    },
    user_genre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'genre',
        key: 'id',
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo_str: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    connectionsList: {
      type: DataTypes.INTEGER,
      allowNull: true,
      get() {
        return this.getDataValue('connectionsList').split(';');
      },
      set(val) {
        this.setDataValue('connectionsList', val.join(';'));
      },
      references: {
        model: 'connections',
        key: 'user_id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
