const pool = require('../db');

async function createStudent(name, username, email, password){
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

        //INSERT INTO students
        const newStudent = await client.query(
            'INSERT INTO student (userid) VALUES ($1) RETURNING *',
            [userId]
        )

        //COMMIT TRANSACTION
        await client.query('COMMIT');

        return {
            user: {
                ...newUser.rows[0],name, username, email
            },
            student: newStudent.rows[0] 
        }
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
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
        await client.query(
            'DELETE FROM users WHERE userid = $1',
            [userId]
        );

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

module.exports = {
    createStudent,
    deleteStudent
}
