const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const Email = require('./email')
const path = require('path')
//Email();
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Upload Endpoint
app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  // timestamp => 5/11/2020 => 2334334343432423

  // 2334343432423abcxyz.jpg

  // Object.keys(req.files).forEach(function (key) {

  //   console.log(key, req.files[key]);
  //   // imgLst.push(nimage[key])

  // });
  // const imagename = req.body.split(" ").join('')

  file.mv(`${__dirname}/client/public/uploads/${req.body.imagename}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  })
});




// Upload Endpoint
app.post("/upload/ad/image", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  var timestamp = req.body.imagename

  // console.log("REQUEST")
  // console.log("Time : " + timestamp)

  req.files.file.mv(`${__dirname}/client/public/ads/${timestamp}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: (timestamp), filePath: `/uploads/${timestamp}` });
  });
});



app.use("/api/users", require("./routes/users"));
app.use("/api/authentication", require("./routes/authentication"));
app.use("/api/ads", require("./routes/ad"));
//app.use('/api/profile', require('./routes/profile'));

app.use(express.static(__dirname + '/client/build'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
