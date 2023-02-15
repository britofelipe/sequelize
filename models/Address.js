const { DataTypes } = require("sequelize")
const db = require("../db/conn")
const User = require("./User")

const Address = db.define("Address", { // Name of Model
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    }  
})

// MAKING THE RELATION
User.hasMany(Address)
Address.belongsTo(User)

module.exports = Address