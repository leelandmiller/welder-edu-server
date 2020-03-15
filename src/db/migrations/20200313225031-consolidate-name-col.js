'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'name', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.removeColumn('Users', 'firstName', { transaction: t }),
        queryInterface.removeColumn('Users', 'lastName', { transaction: t })
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'name', { transaction: t }),
        queryInterface.addColumn('Users', 'firstName', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('Users', 'lastName', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t })
      ]);
    });
  }
};
