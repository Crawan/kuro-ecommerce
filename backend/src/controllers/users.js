const user = require("../database/repository/users")
const { validate } = require('email-validator')
const { successResponse, errorResponse } = require("../utils/response")
const { hashPassword, compareHash } = require("../utils/user")
const { createToken } = require("../utils/jwt")



const signUp = async (req, res) => {
    const { username, password, email } = req.body
    
    if (!email || !validate(email)) {
        return res.json(errorResponse("Uh oh your email is invalid!", "Invalid Email"))
    }

    try {
        const hashedPassword = await hashPassword(password)
        const newUser = await user.newUser(username, hashedPassword, email)
        
        return res.json(successResponse("User successfully registered", { username, email }))
    } catch (err) {
        console.error(err)
        return res.status(500).json(errorResponse("An error occurred during registration", err.message))
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body
    const row = await user.getUserByEmail(email)
    if (!row) {
        return res.json(errorResponse("Uh oh email or password is incorrect!"))
    }
    const isValid = await compareHash(password, row.password)
    if (!isValid) {
        return res.json(errorResponse("Uh oh email or password is incorrect!"))
    }

    return res.json(successResponse("User successfully logged in", {
        userData: row,
        jwtToken: createToken({ id: row.id, email: row.email, username: row.username })
    }))
}

const profile = async (req, res) => {
    try {
        const userDataFromJWT = req.user
        const userDataFromDB = await user.getUserByUsername(userDataFromJWT.username)
        res.json(successResponse("Successfully get the user data!", userDataFromDB))
    } catch (error) {
        return res.json(errorResponse("Program Failed!", error))
    }

}

module.exports = { signUp, signIn, profile }