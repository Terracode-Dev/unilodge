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

async function updateProperty(propid, name, adress, description){
    const client = await pool.connect();

    try {
        await client.query(
            'UPDATE property SET name = $1, address = $2, description = $3 WHERE propid = $4',
            [name, adress, description, propid]
        );

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally {
        client.release();
    }
}


async function updateReservationStatus(reserid, status){
    const client = await pool.connect();

    try {
        await client.query(
            'UPDATE res_status SET status = $1 WHERE reserid = $2',
            [status, reserid]
        );

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally {
        client.release();
    }

}

async function addReservation(propid, lid , uid){
    const client = await pool.connect();

    try {

        const resultstd = await client.query(
            'SELECT * FROM student where userid=$1',
            [uid]
        );

        const resid = await client.query(
            'INSERT INTO reservation (propid, studentid) VALUES ($1, $2) RETURNING reserid',
            [propid, resultstd.rows[0].studentid]
        );


        await client.query(
            'INSERT INTO res_status (lid, reserid) VALUES ($1, $2) RETURNING reserid',
            [lid, resid.rows[0].reserid]
        );



        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally {
        client.release();
    }
}


async function getReservedProperties(usid){

    const client = await pool.connect();
    
    let properrtySet = [];


    try {

        const landid = await client.query(
            'SELECT * FROM landlord where userid=$1',
            [usid]
        );
        const result = await client.query(
            'SELECT * FROM res_status where lid=$1',
            [landid.rows[0].landlordid]
        );

        console.log("first result: ", result.rows);

        await client.query('BEGIN');
        for (let row of result.rows) {
            const resID = row.reserid;
            const resStatid = row.ressstatid;

            const reserData = await client.query(
                'SELECT * FROM reservation where reserid=$1',
                [resID]
            );

            const propData = await client.query(
                'SELECT * FROM property where propid=$1',
                [reserData.rows[0].propid]
            );

            const student = await client.query(
                'SELECT * FROM student where studentid=$1',
                [reserData.rows[0].studentid]
            );

            const userData = await client.query(
                'SELECT * FROM users where userid=$1',
                [student.rows[0].userid]
            );

            let resObject = {
                "resID" : resID,
                "resStatid" : resStatid,
                "propName" : propData.rows[0].name,
                "Address" : propData.rows[0].address,
                "picture" : propData.rows[0].picture,
                "student" : userData.rows[0].name,
            }

            //console.log("resObject: ", resObject);
            properrtySet.push(resObject);

        }

        //console.log("properrtySet: ", properrtySet);
        return properrtySet;

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
    updateProperty,
    getReservedProperties,
    updateReservationStatus,
    addReservation
}
