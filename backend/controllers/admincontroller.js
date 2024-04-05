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

const compairPassword = async (password, comfpass) => {
    if(password == comfpass){
        return true;
    }else{
        return false;
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

const AddUser = async (name, username, email, password, comfpass, adminid) => {
    if (await usernameAvailability(username)) {
        if (await compairPassword(password, comfpass)) {
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
            return "Passwords are Not matched";
        }
    } else {
        return "Username Already Exists";
    }
}


async function editUserdetail(name, username, email, password) {
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

// Add warden
async function AddWarden(name, username, email, password, adminid) {
    const client = await pool.connect();
    try {
        const uid = await AddUser(name, username, email, password, adminid);
        if(Number.isInteger(uid)){
            // Add to the warden table
            const newWarden = await client.query(
                'INSERT INTO warden (userid) VALUES ($1) RETURNING *',
                [uid]
            );
            await client.query('COMMIT');
            return {
                name,
                username,
                email,
                warden: newWarden.rows[0]
            };
        }
        
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

//delete warden
async function deleteWarden(userId){
    const client = await pool.connect();
     try{
        await client.query('BEGIN');

        await client.query(
            'DELETE FROM warden WHERE userid = $1',
            [userId]
        );
        
        await deleteUser(userId);

        await client.query('COMMIT');
        
        return 'deleted Successfully';

    }catch(error){
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

//add lanloard
async function AddLanloard(name, username, email, password, adminid) {
    const client = await pool.connect();
    try {
        const uid = await AddUser(name, username, email, password, adminid);
        if(Number.isInteger(uid)){
            const newLandlord = await client.query(
            'INSERT INTO landlord (userid) VALUES ($1) RETURNING *',
            [uid]
            );
            await client.query('COMMIT');
            return {
                user: {
                    ...newUser.rows[0],
                    name,
                    username,
                    email
                },
                lanloard: newLandlord.rows[0]
            };
        }
        
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

//detele lanloard
async function deleteLandLoad(userId){
    const client = await pool.connect();
    try{
        await client.query('BEGIN');

        await client.query(
            'DELETE FROM landlord WHERE userid = $1',
            [userId]
        );
        
        await deleteUser(userId);

        await client.query('COMMIT');
        
        return 'deleted Successfully';

    }catch(error){
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }

}

async function createStudent(name, username, email, password, comfpass){
    const client = await pool.connect();
    if (await usernameAvailability(username)) {
        if (await comparePassword(password, comfpass)) {
            try {
                await client.query('BEGIN');

                //INSERT INTO users
                const newUser = await client.query(
                    'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
                    [name, username, email, password]
                )
                //Get user id
                const userId = newUser.rows[0].userid;

                //INSERT INTO students
                const newStudent = await client.query(
                    'INSERT INTO student (userid) VALUES ($1) RETURNING *',
                    [userId]
                )

                //COMMIT TRANSACTION
                await client.query('COMMIT');

                return {
                    user: {
                        ...newUser.rows[0], name, username, email
                    },
                    student: newStudent.rows[0] 
                }
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } else {
            return "Passwords are Not matched";
        }
    } else {
        return "Username Already Exists";
    }
}


async function deleteStudent(userId) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // DELETE FROM landlord
        await client.query(
            'DELETE FROM student WHERE userid = $1',
            [userId]
        );

        // DELETE FROM users
        await deleteUser(userId);

        // COMMIT TRANSACTION
        await client.query('COMMIT');

        return 'Student deleted successfully';
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}


module.exports ={
    AddLanloard,
    AddWarden,
    deleteLandLoad,
    deleteWarden,
    editUserdetail,
    createStudent,
    deleteStudent
}