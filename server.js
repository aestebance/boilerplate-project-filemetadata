var express = require('express');
var cors = require('cors');
let bodyParser = require('body-parser');
const multer = require('multer');

require('dotenv').config()

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, "");
    }
});

app.post('/api/fileanalyse', multer({storage: multer.memoryStorage()}).single("upfile"), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
})
