const pool = require('../db');

//TODO: add table columns
async function createLandlord(name, username, email, password){
    try {
        const query = `INSERT INTO () VALUES ($) RETURNING *`;
        const values = [];
        const {rows} = await pool.query(query, values);
        return rows;

    } catch (error) {
        
    }
} 
