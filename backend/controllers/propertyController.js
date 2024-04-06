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

async function getPropertiesbylid(userid) {
    if (!userid) {
        throw new Error('userid is required'); // Validate input parameter
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Start a transaction

        // Retrieve landlordid based on userid
        const landlordResult = await client.query(
            'SELECT landlordid FROM landlord WHERE userid = $1',
            [userid]
        );

        if (landlordResult.rows.length === 0) {
            throw new Error(`Landlord not found for the given userid ${userid}`);
        }

        const landlordId = landlordResult.rows[0].landlordid;

        // Retrieve properties associated with landlordid
        const propertyResult = await client.query(
            'SELECT * FROM property WHERE lid = $1',
            [landlordId]
        );

        await client.query('COMMIT'); // Commit the transaction

        return propertyResult.rows;
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        throw error; // Re-throw the error for higher-level error handling
    } finally {
        client.release(); // Release the client back to the pool
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

async function updateStatus(propid, status) {
    const client = await pool.connect();

    try {
        await client.query(
            'UPDATE property SET status = $1 WHERE propid = $2',
            [status, propid]
        );

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function getApprovedprop(){
    const client = await pool.connect();

    try {
        const result = await client.query(
            'SELECT * FROM property where status=$1',
            ['approved']
        );

        await client.query('COMMIT');

        return result.rows;
    } catch (error) {
        throw error;
    }finally {
        client.release();
    }  

}

async function getRejectedprop(){
    const client = await pool.connect();

    try {
        const result = await client.query(
            'SELECT * FROM property where status=$1',
            ['declined']
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
    updateStatus,
    getApprovedprop,
    getRejectedprop,
}
