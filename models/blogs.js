'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blogs.belongsTo(models.User, { foreignKey: "author" });
      // Blogs.belongsTo(models.Category, { foreignKey: "id" })
    }
  }
  Blogs.init({
    title: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.STRING, allowNull: false },
    published_date: { type: DataTypes.DATE, allowNull: false },
    modify_date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM, values: ["Publish", "Unpublish"] },
    category: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.INTEGER },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Blogs',
  });


  return Blogs;
};