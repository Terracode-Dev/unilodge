const pool = require("../../db");


async function getpendingprop(lid) {
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
                WHERE lid = $1
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

async function getrejectedprop(lid) {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT property.*
            FROM property
            INNER JOIN prop_statu ON property.propid = prop_statu.propid
            WHERE prop_statu.status = 'false' && property.lid = $1
        `;
        const { rows } = await client.query(queryText,[lid]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}


async function getapprovedprop(lid) {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT property.*
            FROM property
            INNER JOIN prop_statu ON property.propid = prop_statu.propid
            WHERE prop_statu.status = 'true' && property.lid = $1
        `;
        const { rows } = await client.query(queryText,[lid]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}

//accept reservation 
async function AccReserv(reservid,lid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'INSERT INTO res_status (lid,reserid, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [lid, reservid, 'true'];
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

//reject reservation 
async function RejReserv(reservid,lid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'INSERT INTO res_status (lid,reserid, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [lid, reservid, 'false'];
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


async function allAccReserv(lid){
     let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT property.*
            FROM reservation
            INNER JOIN res_status ON reservation.reserid = res_status.reserid
            WHERE res_status.status = 'true' && res_status.lid = $1
        `;
        const { rows } = await client.query(queryText,[lid]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}


async function allRejReserv(lid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT property.*
            FROM reservation
            INNER JOIN res_status ON reservation.reserid = res_status.reserid
            WHERE res_status.status = 'false' && res_status.lid = $1
        `;
        const { rows } = await client.query(queryText,[lid]);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
}


async function allPendReser(lid){
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = `
            SELECT *
            FROM reservation
            WHERE reserid NOT IN (
                SELECT reserid
                FROM res_status
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

module.exports = {getpendingprop,getapprovedprop,getrejectedprop,allAccReserv,RejReserv,AccReserv,allRejReserv,allPendReser}
