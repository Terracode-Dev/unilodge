const pool = require('../db');

async function createLandlord(name, username, email, password){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        //INSERT INTO users
        const newUser = await client.query(
            'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, username, email, password]
        )
        //Get user id
        const userId = newUser.rows[0].userid;
        

        //INSERT INTO landlords
        const newLandlord = await client.query(
            'INSERT INTO landlord (userid) VALUES ($1) RETURNING *',
            [userId]
        )

        //COMMIT TRANSACTION
        await client.query('COMMIT');

        return {
            user: {
                ...newUser.rows[0],name, username, email
            },
            landloard: newLandlord.rows[0] 
        }
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

async function updateLandlord(userId, name, username, email, password) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // UPDATE users
        const updatedUser = await client.query(
            'UPDATE users SET name = $1, username = $2, email = $3, password = $4 WHERE userid = $5 RETURNING *',
            [name, username, email, password, userId]
        );

        // COMMIT TRANSACTION
        await client.query('COMMIT');

        return updatedUser.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function deleteLandlord(userId) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // DELETE FROM landlord
        await client.query(
            'DELETE FROM landlord WHERE userid = $1',
            [userId]
        );

        // DELETE FROM users
        await client.query(
            'DELETE FROM users WHERE userid = $1',
            [userId]
        );

        // COMMIT TRANSACTION
        await client.query('COMMIT');

        return 'Landlord deleted successfully';
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}
module.exports = {
    createLandlord,
    updateLandlord,
    deleteLandlord
}
