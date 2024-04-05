const pool = require('../db');

// Cretae a new property
async function createProperty(price, address, lat, lng, picture, name, lid,discription){
    try {
        const client = await pool.connect();
        await client.query(
            'INSERT INTO property(price, address, lat, lng, picture, name, lid,discription) values($1,$2,$3,$4,$5,$6,$7,$8)',
            [price,address,lat,lng,picture,name,lid,discription]
        );
        await client.query('COMMIT');
        
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    
}

//edit property 
async function edtiPropety(){

}

//delete property