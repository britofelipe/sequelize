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
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    primeMember: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})