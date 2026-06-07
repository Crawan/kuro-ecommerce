const express = require('express')
const dotenv = require('dotenv')
const { initDB } = require('./database/database')
const kuro = express()
const user = require('./controllers/users')
const { verifyToken } = require('./middlewares/jwt')
const { mitraSignUp, mitraProfile } = require('./controllers/mitra')
const { getServices } = require('./database/repository/services')
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

kuro.post("/mitra-signup", verifyToken, mitraSignUp)
kuro.get("/mitra-profile", mitraProfile)

kuro.get("/services", getServices)

kuro.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
})

