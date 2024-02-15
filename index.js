const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
 const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));//logger
app.use(cors());// connect to frontend
app.use(express.json())


//routes



//user
//randomActivity








app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})