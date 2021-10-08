require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

const port = app.listen(process.env.PORT, () =>
  console.log(`Listening on port: ${process.env.PORT}`)
);
