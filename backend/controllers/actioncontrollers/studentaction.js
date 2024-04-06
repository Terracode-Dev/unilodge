const pool = require("../../db");

//add reservation for the property 
async function AddReservation(studentid,propertyid,description){
    try{
        const client = await pool.connect();
        await client.query("BEGIN");
        await client.query(
            //QUERY
            'INSERT INTO reservation (propid,studentid,description) VALUES($1,$2,$3)',
            [propertyid,studentid,description]
        );
        
        await client.query('COMMIT');
            return 'Reserved sucessfully';
    }catch (error){
        await client.query('ROLLBACK');
        throw error;
    }
}

//cancel the reservation 
async function CancelReservation(reservationid){
    try {
        const client = await pool.connect();
        await client.query('BEGIN');
        await client.query(
            'DELETE FROM  reservation WHERE reserid = $1',
            [reservationid]
        );
        await client.query('COMMIT');
        return 'Canceled successfully';
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
}

// get the accepted reservations  related to the peticular student
async function getAccReserv(studentid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        //const queryText = 'INSERT INTO res_status (wardenid,propid, status) VALUES ($1, $2, $3) RETURNING *';
        // const values = [wardenid, propertyid, 'true'];
        // const { rows } = await client.query(queryText, values);

        await client.query('COMMIT');

        return rows[0];
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

//get rejected rservation for the peticular student 
async function getRejReserv(studentid){
     let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // const queryText = 'INSERT INTO prop_statu (wardenid,propid, status) VALUES ($1, $2, $3) RETURNING *';
        // const values = [wardenid, propertyid, 'false']; 
        // const { rows } = await client.query(queryText, values);

        await client.query('COMMIT');

        return rows[0];
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

//get pending reservations related  to the peticular student 
async function getPendReser(studentid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT reserid
            FROM reservation
            WHERE reserid NOT IN (
                SELECT reserid
                FROM res_status
            )
        `;
        const { rows } = await client.query(queryText, [studentid]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

module.exports = {
    AddReservation,
    CancelReservation,
    getAccReserv,
    getPendReser,
    getRejReserv
}