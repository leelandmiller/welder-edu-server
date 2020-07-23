'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'email', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t }),
        queryInterface.changeColumn('Users', 'password', {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'email', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }, { transaction: t }),
        queryInterface.changeColumn('Users', 'password', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }, { transaction: t })
      ])
    })
  }
};
