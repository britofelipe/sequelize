const { DataTypes } = require("sequelize")
const db = require('../db/conn')

const User = db.define("User", { // Name of Model
    name: {
        type: DataTypes.STRING,
        allowNull: false
        // No necessity of using Id
    },
    occupation: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
    prime: {
        type: DataTypes.BOOLEAN,
    } 
})

module.exports = User