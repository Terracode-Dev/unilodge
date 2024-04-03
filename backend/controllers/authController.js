const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
require('dotenv').config();

const loginUser = async (req, res) => {
    const { username, password, userType } = req.body;

    try {
        let query;
        let userRole;

        // Determine the query and user role
        switch(userType){
            case 'landlord':
                query = 'SELECT users.userid, users.username, users.password, landlord.landlordid AS landlordid FROM users LEFT JOIN landlord ON users.userid = landlord.userid WHERE users.username = $1';
                userRole = 'landlord';
                break;
            
            case 'student':
                query = 'SELECT users.userid, users.username, users.password, student.studentid AS studentid FROM users LEFT JOIN student ON users.userid = student.userid WHERE users.username = $1';
                userRole = 'student';
                break;

            case 'warden':
                query = 'SELECT users.userid, users.username, users.password, warden.wardenid AS wardenid FROM users LEFT JOIN warden ON users.userid = warden.userid WHERE users.username = $1';
                userRole = 'warden';
                break;
            
            default:
                return res.status(400).json({message: 'Invalid user type'});  
        }

        // Query the DB
        const { rows } = await pool.query(query,[username]);

        // Check if user exists
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare hashed password
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {userid: user.userid, username: user.username, userRole},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        // Return token with user data
        res.status(200).json({ token, user: { id: user.id, username: user.username, role: userRole } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { loginUser };
