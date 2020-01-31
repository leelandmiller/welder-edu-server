const uuid = require('uuid/v4')
const Sequelize = require('sequelize')
const sequelize = require('../config/connection')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING
  }
})

module.exports = User