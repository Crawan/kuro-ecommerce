const { pool } = require('../database')

async function newUser(uuid, username, password, email) {
    const res = await pool.query("INSERT INTO users (id, username, password, email) VALUES($1, $2, $3, $4)", [uuid, username, password, email])
    return res.rows
} 

async function getUserByEmail(email) {
    const res = await pool.query("SELECT username, email, password FROM users WHERE email = $1", [email])
    const row = res.rows.length > 0 ? res.rows[0] : null;
    if (!row) {
        return null
    }
    return row
}

async function getUserByUsername(username) {
    try {
        const res = await pool.query("SELECT id, username, email, created_at FROM users WHERE username = $1", [username])
        const row = res.rows.length > 0 ? res.rows[0] : null
        if (!row) {
            throw new Error("User cannot be found in the database!")
        }
        return row
    } catch (error) {
        console.error(error);
        
        return error
    }
}

module.exports = { newUser, getUserByEmail, getUserByUsername }