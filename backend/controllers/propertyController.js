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

        const { landlordid } = result.rows[0].landlordid;

        await client.query(
            'INSERT INTO property (price, address, lat, lng, picture,name, lid, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [price, address, lat, lng, picture, name, landlordid, description]
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

module.exports = {
    createProperty
}
