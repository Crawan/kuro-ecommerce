const { decodeJWT } = require("../utils/jwt")
const { errorResponse } = require("../utils/response")

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader?.split(' ')[1]
        if (!token) {
            throw new Error("Uh oh token not found!")
        }
        const decodedToken = await decodeJWT(token)

        req.user = decodedToken

        next()
    } catch (error) {
        console.error(error);
        return res.json(errorResponse("Failed to get profile!", error))
    }
}

module.exports = { verifyToken }