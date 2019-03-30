const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './target/');
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, file.originalname+"@"+newFilename);
  },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './client/build')));


app.post('/submit', upload.any(), (req, res) => {

  console.log('email '+ req.body.email);
  console.log('height '+req.body.height+' type:'+typeof +req.body.height);
  console.log('width',req.body.width+' type:'+typeof +req.body.width);
  console.log('file count '+req.files.length);

  let {PythonShell} = require('python-shell')
  var pyshell = new PythonShell('code.py');
  pyshell.send(req.body.width);
  pyshell.send(req.body.height);
  pyshell.send(req.body.email);
  pyshell.on('message', function (message) {
  console.log(message);  
  }); 

res.send('Done uploading files: '+req.files.length);
});
const port = process.env.PORT || 80;
app.listen(port);

console.log(`Image feature extractor listening on ${port}`);