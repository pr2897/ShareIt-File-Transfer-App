require('dotenv').config();

const connectDB = require('./config/db');
const fs = require('fs');
const File = require('./model/fileSchema');
async function fetchData() {
  await connectDB();
  const pastDate = Date.now() - 24 * 60 * 60 * 1000;
  const files = await File.find({ createdAt: { $lt: pastDate } });

  if (files) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();

        console.log(`Successfully Deleted: ${file.fileName}`);
      } catch (error) {
        console.log(`Error while Deleting. ${error}`);
      }
    }
    console.log('Job Done!');
  }
}

fetchData().then(process.exit).catch();
