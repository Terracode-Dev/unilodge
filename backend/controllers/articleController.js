const pool = require('../db');

async function createArticle(title, description, image){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');


        //INSERT INTO articles
        const newArticle = await client.query(
            'INSERT INTO article (title, description, image) VALUES ($1, $2, $3) RETURNING *',
            [ title, description, image]
        )

        //COMMIT TRANSACTION
        await client.query('COMMIT');

        return newArticle.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

async function getArticles(){
    const client = await pool.connect();

    try {
        const articles = await client.query('SELECT * FROM article');
        await client.query('COMMIT');
        return articles.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
}

module.exports = {
    createArticle,
    getArticles,
}
