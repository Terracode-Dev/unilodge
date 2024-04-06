const pool = require('../db');

// Cretae a new property
async function createProperty(price, address, lat, lng, picture, name,description, userid){
    const client = await pool.connect();

    try {
        const result = await client.query(
            'SELECT landlordid FROM landlord where userid=$1',
            [userid]
        )

        if (result.rows.length === 0) {
            throw new Error('Landlord not found for the given userid');
        }

        const  lid  = result.rows[0].landlordid;

        await client.query(
            'INSERT INTO property (price, address, lat, lng, picture,name, lid, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [price, address, lat, lng, picture, name, lid, description]
        );

        await client.query('COMMIT');
        return { success: true };
    } catch (error) {
        if (client) {
            await client.query('ROLLBACK');
        }
        throw error;
    }finally {
        client.release();
    }  
}

async function getPropertiesbylid(userid){
    const client = await pool.connect();

    try {
        const landloard = await client.query(
            'SELECT landlordid FROM landlord where userid=$1',
            [userid]
        )

        if (landloard.rows.length === 0) {
            throw new Error(`Landlord not found for the given userid ${userid}`);
        }

        const  lid  = landloard.rows[0].landlordid;

        const result = await client.query(
            'SELECT * FROM property where lid=$1',
            [lid]
        );

        await client.query('COMMIT');

        return result.rows;
    } catch (error) {
        throw error;
    }finally {
        client.release();
    }  
}

async function getPendingProperties(){
    const client = await pool.connect();

    try {
        const result = await client.query(
            'SELECT * FROM property where status=$1',
            ['pending']
        );

        await client.query('COMMIT');

        return result.rows;
    } catch (error) {
        throw error;
    }finally {
        client.release();
    }  
}
module.exports = {
    createProperty,
    getPropertiesbylid,
    getPendingProperties,
}
