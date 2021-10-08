require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

connectDB();

//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

const port = app.listen(process.env.PORT, () =>
  console.log(`Listening on port: ${process.env.PORT}`)
);
