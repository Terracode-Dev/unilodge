const pool = require('../db');

//Admin controllers
const usernameAvailability = async (username) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT COUNT(*) AS count FROM users WHERE username = $1',
            [username]
        );

        return result.rows[0].count === '0';
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}


const deleteUser = async (userId) => {
      const client = await pool.connect();
    try{
        await client.query('BEGIN');

        await client.query(
            'DELETE FROM users WHERE userid = $1',
            [userId]
        );
        await client.query('COMMIT');
        
    }catch(error){
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

const AddUser = async (name, username, email, password, adminid) => {
    if (await usernameAvailability(username)) {
         try {
                const client = await pool.connect();
                await client.query("BEGIN");
                // Add to user table
                const newUser = await client.query(
                    'INSERT INTO users (adminid, name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING userid',
                    [adminid, name, username, email, password]
                );
                await client.query('COMMIT');
                return newUser.rows[0].userid;
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            }
    } else {
        return "Username Already Exists";
    }
}


async function editUserdetail(userID,name, username, email, password) {
    const client = await pool.connect(); 

    try {
        await client.query('BEGIN');

        await client.query(
            'UPDATE users SET name = $1, username = $2, email = $3, password = $4',
            [name, username, email, password]
        );

        await client.query('COMMIT');
        
        return 'Details Edited Successfully';

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}


module.exports ={
    editUserdetail,
    AddUser,
    deleteUser
}