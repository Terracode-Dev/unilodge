const pool = require('../db');

// Cretae a new property
async function createProperty(price, address, lat, lng, picture, name, lid){
    const client = await pool.connect();
    
}
