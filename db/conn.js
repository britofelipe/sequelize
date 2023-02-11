const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("nodesequelize", "root", "", {
        host: "localhost",
        dialect: "mysql"
})

try {
    sequelize.authenticate()
    console.log("Connection successful with sequelize")
} catch (err) {
    console.log("Concection not possible: ", error)
}

module.exports = sequelize