const { pool } = require('../database')

async function newMitra(ownerID, name, description) {
    if (!ownerID || !name) {
        throw new Error("Owner ID or Name must be filled!")
    }
    const res = await pool.query("INSERT INTO mitra (owner_id, name, description) VALUES($1, $2, $3)", [ownerID, name, description])
    return res.rowCount
} 

async function getMitraByOwnerID(owner_id) {
    const res = await pool.query("SELECT name, owner_id, description FROM mitra WHERE owner_id = $1", [owner_id])
    const row = res.rows.length > 0 ? res.rows[0] : null;
    if (!row) {
        throw new Error("Mitra NOT FOUND")
    }
    return row
}

async function getMitraByID(id) {
    const res = await pool.query("SELECT name, owner_id, description, created_at FROM mitra WHERE id = $1", [id])
    const row = res.rows.length > 0 ? res.rows[0] : null;
    if (!row) {
        throw new Error("Mitra NOT FOUND")
    }
    return row
}

async function getMitraByName(name) {
    try {
        const res = await pool.query("SELECT name, owner_id, description FROM mitra WHERE name = $1", [name])
        const row = res.rows.length > 0 ? res.rows[0] : null
        if (!row) {
            throw new Error("mitra cannot be found in the database!")
        }
        return row
    } catch (error) {
        console.error(error);
        
        return error
    }
}

module.exports = { newMitra, getMitraByName, getMitraByID }