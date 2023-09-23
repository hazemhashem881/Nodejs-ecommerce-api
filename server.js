const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config({ path:'config.env'});
const ApiError = require('./utils/apiError');
const globalError = require("./middleware/errorMiddleware")
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

// Connect with db
dbConnection();

// express app
const app = express ();

// Middlewares
app.use(express.json());
if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}

//Mount Route
app.use('/api/v1/categories', categoryRoute);

app.all('*',(req,res,next) => {
    // Create error and send it to error handling middleware
    // const err = new Error(`Can't find this route: ${req.originalUrl}`);
    // next(err.message)
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
});

// Global error handling middleware
app.use(globalError)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
