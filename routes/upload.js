const express = require('express');
const router = express.Router();



router.post('api/upload', [], (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files
  console.log("Images : " + file)
  res.json({ 'status': 200 })

  Object.keys(file).forEach(function (key) {
    file[key].mv(`${__dirname}/client/public/uploads/${file[key].name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    res.json({ fileName: file[key].name, filePath: `/uploads/${file[key].name}` });
  });
});
