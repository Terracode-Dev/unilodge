const pool = require('../db');

async function createAdmin(name,email, username, password,contact){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        //INSERT INTO users
        const newUser = await client.query(
            'INSERT INTO users (name, username, email, password,contact) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, username, email, password,contact]
        )
        //Get user id
        const userId = newUser.rows[0].userid;
        

        //INSERT INTO landlords
        const newAdmin = await client.query(
            'INSERT INTO admin (name,contactnumber,email,username,password,userid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, contact,email, username, password,userId]
        )

        //COMMIT TRANSACTION
        await client.query('COMMIT');

        return {
            user: {
                ...newUser.rows[0],name, username, email
            },
            admin: newAdmin.rows[0] 
        }
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

module.exports = {
    createAdmin,
}
