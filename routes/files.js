const express = require('express');
const router = express.Router();
const path = require('path');
const File = require('../model/fileSchema');
const multer = require('multer');
const { v4: uuid4 } = require('uuid');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fieldSize: 100000 * 100 },
}).single('myfile');

router.post('/', (req, res) => {
  //   store files
  upload(req, res, async (err) => {
    //   validate Request
    if (!req.file) {
      return res.json({ error: 'All fields are required.' });
    }
    if (err) res.status(500).json({ error: err.message });
    //   store in Database
    const file = new File({
      fileName: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.status(200).json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
    //   http://localhost:3000/files/23sfsdf2323-dsfsdfsdf266a2
  });

  //    Response -> Link
});

module.exports = router;
