import { AddUser } from "./admincontroller";
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

module.exports = {
    AddLanloard,
    deleteLandLoad
}