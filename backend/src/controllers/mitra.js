const { getMitraByID, newMitra } = require("../database/repository/mitra");
const { errorResponse, successResponse } = require("../utils/response");


const mitraSignUp = async (req, res) => {
    try {
        const { username, id } = req.user;
        if (!id || !username) {
            console.log("ID not found");
            throw new Error("ID OR USERNAME NOT FOUND!")
            
        }
        const {mitraName, description} = req.body
        if (!username || !mitraName) {
            throw new Error("Failed to get the username from token!")
        }
        await newMitra(id, mitraName, description)
        return res.json(successResponse(`New mitra has been added with the ownerID of ${id}`, { name: mitraName, owner_id: id, description: description }))
    } catch (error) {
        return res.json(errorResponse("An error occured!", error))
    }
}

const mitraProfile = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            throw new Error("Uh oh ID IS NOT PROVIDED")
        }
        const mitra = await getMitraByID(id)
        return res.json(successResponse(`Mitra found!`, mitra))
    } catch (error) {
        return res.json(errorResponse("An error occured!", error))
    }
}

module.exports = { mitraSignUp, mitraProfile }