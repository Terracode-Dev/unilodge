const pool = require("../../db");

//get all the details related to the peticular property
const searchPropDetail = async (propertyID) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'SELECT * FROM property WHERE propid = $1';
        const { rows } = await client.query(queryText, [propertyID]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
    
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
    
        if (client) client.release();
    }
};

//approve the property 
const Approveprop = async (propertyid, wardenid) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'INSERT INTO prop_statu (wardenid,propid, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [wardenid, propertyid, 'true'];
        const { rows } = await client.query(queryText, values);

        await client.query('COMMIT');

        return rows[0];
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
};

//reject the property 
async function RejectProp(propertyid,wardenid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'INSERT INTO prop_statu (wardenid,propid, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [wardenid, propertyid, 'false']; 
        const { rows } = await client.query(queryText, values);

        await client.query('COMMIT');

        return rows[0];
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

//get the pending property
async function getAllpending() {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT *
            FROM property
            WHERE propid NOT IN (
                SELECT propid
                FROM prop_statu
            )
        `;
        const { rows } = await client.query(queryText, [lid]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getAllApprovedProperties() {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Query to select all property details where status is 'true' in prop_statu table
        const queryText = `
            SELECT property.*
            FROM property
            INNER JOIN prop_statu ON property.propid = prop_statu.propid
            WHERE prop_statu.status = 'true'
        `;
        const { rows } = await client.query(queryText);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

async function getAllRejectedProperties() {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Query to select all property details where status is 'false' in prop_statu table
        const queryText = `
            SELECT property.*
            FROM property
            INNER JOIN prop_statu ON property.propid = prop_statu.propid
            WHERE prop_statu.status = 'false'
        `;
        const { rows } = await client.query(queryText);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}


module.exports = {searchPropDetail,Approveprop,RejectProp,getAllpending,getAllApprovedProperties,getAllRejectedProperties}