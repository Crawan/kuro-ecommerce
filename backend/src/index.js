const express = require('express')
const dotenv = require('dotenv')
const { initDB } = require('./database/database')
const kuro = express()
const user = require('./controllers/users')
const { verifyToken } = require('./middlewares/jwt')
dotenv.config()
initDB()
kuro.use(express.json())


kuro.get("/", (req, res) => {
    res.json({
        message: "Hello world"
    })
})
kuro.post("/login", user.signIn)
kuro.get("/profile", verifyToken, user.profile)
kuro.post("/register", user.signUp)

kuro.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
})

