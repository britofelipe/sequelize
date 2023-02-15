// EXTERNAL
const express = require("express")
const exphbs = require("express-handlebars")

// INTERNAL
const conn = require('./db/conn')

// MODELS
const User = require("./models/User")
const Address = require("./models/Address")

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

// GET
app.get("/", async (req, res) => {
    res.render("home")
})

app.get("/users/table", async (req, res) => {
    const users = await User.findAll({ raw: true }) // Only with useful data
    res.render("users", { users: users})
})

app.get("/users/grade", async (req, res) => {
    const users = await User.findAll({ raw: true }) // Only with useful data
    res.render("users-gradeview", { users: users})
})

app.get("/users/create", async (req, res) => {
    res.render("register")
})

app.get("/users/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findOne({
        raw: true, 
        where: { 
            id: id
        },
    })
        .then((user) => {
            res.render("user", { user })
        })
        .catch((err) => console.log(err))
})

app.get("/users/update/:id", async(req, res) => {
    const id = req.params.id
    User.findOne({
        include: Address, // Picking Addresses data
        where: { 
            id: id
        },
    })
    .then((user) => {
        // Maing address visualization possible
        res.render("update-user", { user: user.get({ plain: true }) })
    })
    .catch((err) => console.log(err))
})

// POST
app.post("/users/create", async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    const email = req.body.email
    let newsletter = req.body.newsletter
    let prime = req.body.prime

    if(newsletter === "on") {
        newsletter = true
    } else {
        newsletter = false
    }
    if(prime === "on") {
        prime = true
    } else {
        prime = false
    }

    await User.create({ name, occupation, email, newsletter, prime}) //async
    res.redirect("/users/grade")
})

app.post("/users/delete/:id", async(req, res) => {
    const id = req.params.id

    await User.destroy({ where: { id : id}})
    res.redirect("/users/grade")
})

app.post("/users/update", async(req, res) => {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    const email = req.body.email
    let newsletter = req.body.newsletter
    let prime = req.body.prime

    if(newsletter === "on") {
        newsletter = true
    } else {
        newsletter = false
    }
    if(prime === "on") {
        prime = true
    } else {
        prime = false
    }

    // Creating the objetct
    const userData = {
        id,
        name,
        occupation,
        email,
        newsletter,
        prime
    }

    console.log(userData)

    await User.update(userData, {where: {id: id}})
    
    res.redirect("/users/grade")
})

app.post("/address/create", async(req, res) => {
    const UserId = req.body.UserId
    const country = req.body.country
    const state = req.body.state
    const city = req.body.city
    const neighborhood = req.body.neighborhood
    const street = req.body.street
    const number = req.body.number

    const address = {
        country,
        state,
        city,
        neighborhood,
        street,
        number,
        UserId,
    }

    try{
        await Address.create(address)
        res.redirect(`/users/update/${UserId}`)
    } catch(error) {
        console.log(error)
    }
})

app.post("/address/delete", async(req, res) => {
    const UserId = req.body.UserId
    const id = req.body.id

    await Address.destroy({
        where: { id: id }
    })

    res.redirect(`/users/update/${UserId}`)
})

// CONNECTION
conn
    .sync()
    // .sync({force: true}) // Force drop table
    .then(() => {
        app.listen(3000)
    })
    .catch(err => console.log(err))
// The application only works if the connection is established