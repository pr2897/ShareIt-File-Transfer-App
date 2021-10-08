const router = require('express').Router();
const File = require('../model/fileSchema');

router.get('/:uuid', async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });

    if (!file)
      return res
        .status(404)
        .json({ success: false, message: 'Link Expired..' });

    return res.status(200).json({
      success: true,
      message: 'download',
      file: {
        fileName: file.fileName,
        fileSize: `${Number(file.size) / 1000}KB`,
        downloadLink: `${process.env.APP_BASE_URL}files/download/${file.uuid}`, //http://localhost:3000/files/download/sdfsdf
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something Went Wrong!',
      error: error.message,
    });
  }
});
module.exports = router;
