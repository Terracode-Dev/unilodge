const pool = require("../../db");

// Create operation
const createArticle = async (adminId, title, description, image) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'INSERT INTO article (adminid, title, description, image) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [adminId, title, description, image];
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

// Read operation
const getArticleById = async (articleId) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'SELECT * FROM article WHERE articleid = $1';
        const { rows } = await client.query(queryText, [articleId]);

        await client.query('COMMIT');

        return rows[0];
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
};

// Update operation
const updateArticle = async (articleId, adminId, title, description, image) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'UPDATE article SET adminid = $1, title = $2, description = $3, image = $4 WHERE articleid = $5 RETURNING *';
        const values = [adminId, title, description, image, articleId];
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

// Delete operation
const deleteArticle = async (articleId) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'DELETE FROM article WHERE articleid = $1 RETURNING *';
        const { rows } = await client.query(queryText, [articleId]);

        await client.query('COMMIT');

        return rows[0];
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
};

const getAllArticles = async () => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const queryText = 'SELECT * FROM article';
        const { rows } = await client.query(queryText);

        await client.query('COMMIT');

        return rows;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        throw error;
    } finally {
        if (client) client.release();
    }
};

module.exports = { createArticle, getArticleById, updateArticle, deleteArticle,getAllArticles };
