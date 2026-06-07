const { pool } = require("../database");

const newServiceCategory = async (name) => {
    try {
        const { email } = req.user
        if (email != "service.category@kuro.com") {
            throw new Error("You are not permitted accessing this feature!");
        }
        if (!name) {
            throw new Error("Name is not provided!")
        }
        const newCategory = await pool.query("INSERT INTO services_category (name) VALUES ($1)", [name])
        return newCategory.rowCount
    } catch (error) {
        throw error
    }
}

const removewServiceCategoryByName = async (name) => {
    try {
        const { email } = req.user
        if (email != "service.category@kuro.com") {
            throw new Error("You are not permitted accessing this feature!");
        }

        if (!name) {
            throw new Error("Name is not provided!")
        }
        const res = await pool.query("DELETE FROM services_category WHERE name = $1", [name])
        return true
    }
    catch (err) {
        console.error("Error from ");
        
        throw err
    }
}

const getAllServicesCategory = async () => {
    try {
        const res = await pool.query('SELECT * FROM services_category')
        return res.rows
    } catch (error) {
        console.error("Error from getAllServicesCategory()", error);
        
        throw error
    }
}

module.exports = { newServiceCategory, removewServiceCategoryByName, getAllServicesCategory }