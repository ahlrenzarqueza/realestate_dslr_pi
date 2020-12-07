const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
var cookieParser = require('cookie-parser');
env.config();

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// routes
const jwtSecret = process.env.JWT_SECRET;
app.use('/api/user/', authRoutes);
app.use('/api/order/', orderRoutes);

// connect to db
const connstr = process.env.DB_CONNECT;
mongoose.connect(connstr, 
    { useNewUrlParser: true },
    () => {
    console.log('Connected to MongoDB');
});

app.listen(3030, () => {
    console.log('Server running on port 3030.')
})