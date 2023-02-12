// EXTERNAL
const express = require("express")
const exphbs = require("express-handlebars")

// INTERNAL
const conn = require('./db/conn')

// MODELS
const User = require("./models/User")

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home")
})

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.log(err))
// The application only works if the connection is established
