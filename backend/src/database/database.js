const pg = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const pool = new pg.Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
})

const initDB = async () => {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT 1;')
        console.log('Database is healthy:', res.rows[0]);
    } catch (error) {
        console.error(error);
    } finally {
        client.release()
    }
}

module.exports = { pool, initDB }
