const mongoose = require('mongoose');

function connectDB() {
  const url = process.env.MONGODB_URL;
  mongoose
    .connect(url, {})
    .then(() => console.log(`DB COnnected`))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
