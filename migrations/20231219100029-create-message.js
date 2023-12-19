'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender:{
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences:{model:"user_info",key:"id"}
      },
      msg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      msg_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      receiver:{
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences:{model:"user_info",key:"id"}
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
    await queryInterface.dropTable('messages');
  }
};