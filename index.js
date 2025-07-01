var express = require('express');
var cors = require('cors');
require('dotenv').config();
let bodyParser = require('body-parser');
const multer = require('multer');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/awe50/Desktop/FreeCodeCamp Projects/Back-end Development Libraries/Final Projects/5/boilerplate-project-filemetadata/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({storage});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), function(req,res) {
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
