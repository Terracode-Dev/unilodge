const pool = require("../../db");

const searchPropDetail = async (propertyID) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Query to retrieve data from property table based on propertyID
        const queryText = 'SELECT * FROM property WHERE propid = $1';
        const { rows } = await client.query(queryText, [propertyID]);

        // Commit the transaction
        await client.query('COMMIT');

        // Return the retrieved rows
        return rows;
    } catch (error) {
        // If there's an error, rollback the transaction and throw the error
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        // Release the client back to the pool
        if (client) client.release();
    }
};
async function Approvedprop(){}
async function RejectProp(){}
async function PendingProp(){}