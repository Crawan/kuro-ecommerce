const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
dotenv.config()

const createToken = ({ email, username }) => {
    return jwt.sign({email, username}, process.env.JWT_SECRET, { expiresIn: '24h' })
}

const decodeJWT = async (token) => {
    try {
        const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
        return decodedJWT
    } catch (error) {
        console.error(error);
        throw new Error("Failed to decode the JWT token!")
    }
}

module.exports = { createToken, decodeJWT }