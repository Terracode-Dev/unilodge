async function getpendingpropprop(lid) {
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

        // Query to select all property details where status is 'false' in prop_statu table
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

        // Query to select all property details where status is 'true' in prop_statu table
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

async function allAccReserv(){}
async function allRejReserv(){}
async function allPendReser(){}