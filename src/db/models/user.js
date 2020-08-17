/*eslint-disable*/
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    discordId: DataTypes.STRING,
    publicKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
