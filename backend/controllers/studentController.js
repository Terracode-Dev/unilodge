const pool = require('../db');

async function AddReservation(studentid,propertyid,description){
    try{
        const client = await pool.connect();
        await client.query("BEGIN");
        const newReservation = await client.query(
            //QUERY
            'INSERT INTO reservation (propid,studentid,description) VALUES($1,$2,$3)',
            [propertyid,studentid,description]
        );
        
        await client.query('COMMIT');

    }catch (error){
        await client.query('ROLLBACK');
        throw error;
    }
}

module.exports = AddReservation


