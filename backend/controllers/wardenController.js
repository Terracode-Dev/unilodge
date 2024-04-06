const admin = require('./admincontroller');

// Add warden
async function AddWarden(name, username, email, password, adminid) {
    const client = await pool.connect();
    try {
        const uid = await admin.AddUser(name, username, email, password, adminid);
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
        
        await admin.deleteUser(userId);

        await client.query('COMMIT');
        
        return 'deleted Successfully';

    }catch(error){
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

module.exports = {
    AddWarden,
    deleteWarden
}