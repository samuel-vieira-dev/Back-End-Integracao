'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cnpj: {
        type: Sequelize.STRING,
        unique: true
      },
      senha_site: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};