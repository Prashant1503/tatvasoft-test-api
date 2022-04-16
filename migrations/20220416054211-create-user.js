'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "Email Must be unique"
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, validate: {
          min: {
            args: true,
            msg: "Password should contain atleast 6 character"
          }
        }
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM,
        values: ["Admin", "User"]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};