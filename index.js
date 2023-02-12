// EXTERNAL
const express = require("express")
const exphbs = require("express-handlebars")

// INTERNAL
const conn = require('./db/conn')

// MODELS
const User = require("./models/User")

console.log(User)

const app = express()

// SETUP
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

// PAGES
app.get("/", (req, res) => {
    res.render("home")
})

// GET
app.get("/users/create", (req, res) => {
    res.render("register")
})

// POST
app.post("/users/create", (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    const email = req.body.email
    let newsletter = req.body.newsletter
    let prime = req.body.prime

    if(newsletter === "on") {
        newsletter = true
    }
    if(prime === "on") {
        prime = true
    }

    User.create({ name, occupation, email, newsletter, prime}) //async
    res.redirect("/")
})

// CONNECTION
conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.log(err))
// The application only works if the connection is established
