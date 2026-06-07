const { getServices } = require("../database/repository/services");
const { errorResponse, successResponse } = require("../utils/response")


const getServicesByCategory = async (req, res) => {
    try {
        const request = req.body
        const services = await getServices(request?.filterByName, 10)
        return res.json(successResponse("Successfully get services!", services))
    } catch (error) {
        console.error("Error from getServicesByCategory()",error);
        return res.json(errorResponse("Uh oh something failed!", error))
    }
}