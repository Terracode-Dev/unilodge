const pool = require('../db');

async function createWarden(name, username, email, password, contact){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        //INSERT INTO users
        const newUser = await client.query(
            'INSERT INTO users (name, username, email, password,contact) VALUES ($1, $2, $3, $4,$5) RETURNING *',
            [name, username, email, password,contact]
        )
        //Get user id
        const userId = newUser.rows[0].userid;

        //INSERT INTO warden
        const wardenQuery = 'INSERT INTO warden (userid) VALUES ($1) RETURNING *';
        console.log(wardenQuery);
        const newWarden = await client.query(
            wardenQuery,
            [userId]
        )

        //COMMIT TRANSACTION
        await client.query('COMMIT');

        return {
            user: {
                ...newUser.rows[0],name, username, email
            },
            warden: newWarden.rows[0] 
        }
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

async function deleteWarden(userId) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // DELETE FROM landlord
        await client.query(
            'DELETE FROM warden WHERE userid = $1',
            [userId]
        );

        // DELETE FROM users
        await client.query(
            'DELETE FROM users WHERE userid = $1',
            [userId]
        );

        // COMMIT TRANSACTION
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    createWarden,
    deleteWarden
}
