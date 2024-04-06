const pool = require('../db');

// Cretae a new property
async function createProperty(price, address, lat, lng, picture, name, lid){
    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO property(price, address, lat, lng, picture, name, lid) values($1,$2,$3,$4,$5,$6,$7,$8)',
            [price,address,lat,lng,picture,name,lid]
        );
        await client.query('COMMIT');
        return 'Added Successfully';
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
    
}

//edit property 
async function edtiPropety(price, address, lat, lng, picture, name, lid,propid){
    try {
        const client = await pool.connect();
        await client.query('BEGIN');
        await client.query(
            'UPDATE property SET price = $1, address = $2, lat = $3, lng = $4, picture = $5, name = $6, lid = $7, WHERE propid =$8 ',
            [price,address,lat,lng,picture,name,lid,propid]
        );
        await client.query('COMMIT');
        return 'Edited successfully';
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

//delete property
async function deteleProperty(propertyid){
    try {
        const client = await pool.connect();
        await client.query('BEGIN');

        await   client.query(
            'DELETE FROM property WHERE propid = $1'),
            [propertyid]
        await client.query('COMMIT');
        return 'Deleted successfully';
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

module.exports = {
    createProperty,
    edtiPropety,
    deteleProperty
}