import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

class Database {

    static query = async (query) => {
        const result = await pool.query(query)
        return result
    }

    static insert = async (query) => {
        const result = await pool.query(query)
        return result
    }
    
    static select = async (query) => {
        const result = await pool.query(query)
        return result.rows
    }

    static update = async (query) => {
        const result = await pool.query(query)
        return result
    }

    static delete = async (query) => {
        const result = await pool.query(query)
        return result
    }
    
}

export default Database