const { pool } = require("../database");
const { getAllServicesCategory } = require("./serviceCategory");


const getServices = async (FindCategory = null, limit = 10) => {
    try {
        if (FindCategory && Array.isArray(FindCategory)) {
            const categoriesList = await getAllServicesCategory()
            const filteredCategories = categoriesList.filter(category => FindCategory.includes(category.name))
            if (filteredCategories.length === 0) throw new Error("Could not find categories!");
            const categoryIds = filteredCategories.map(category => category.id);
            const queryPlaceHolder = categoryIds.map((_, i) => `$${i + 1}`).join(", ")
            const query = `SELECT * FROM service WHERE service_category_id IN (${queryPlaceHolder}) LIMIT $${categoryIds.length + 1}`
            const queryValues = [...categoryIds, limit]
            const services = await pool.query(query, queryValues)
            if (services.rows.length <= 0) {
                throw new Error("Cannot find services with this category")
            }
            return services.rows
        } else {
            const res = await pool.query('SELECT * FROM service LIMIT $1', [limit])
            return res.rows
        }
    } catch (error) {
        console.error("Error from getServices",error);
        throw error
    }
}

const newService = async (mitra_id, service_category_id, name, description, lowest_price, highest_price) => {
    try {
        ;
    } catch (error) {
        throw error
    }
}

module.exports = { getServices }