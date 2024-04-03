// Imports
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Parse json bodies
app.use(bodyParser.json());

// Import routes
const landlordRoutes = require('./routes/landlordRoutes');
const studentRoutes = require('./routes/studentRoutes');
const wardenRoutes = require('./routes/wardenRoutes');
const authRoutes = require('./routes/authRoutes');

// Route handlers
app.use('/landlords', landlordRoutes);
app.use('/students', studentRoutes);
app.use('/wardens', wardenRoutes);
app.use('/login', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
