const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


app.post('/submit', upload.single('files'), (req, res) => {

  console.log('submit '+ req.body.email);
  console.log('check '+ req.body.check);
  console.log('filename '+req.file.filename);
  res.send('email '+req.body.email+ ' filename '+req.file.filename+' check '+ req.body.check);
  // res.sendFile(path.join(__dirname, '/', 'submit.html'));
  let {PythonShell} = require('python-shell')
  pyshell = new PythonShell('code.py');
  pyshell.send(req.file.filename);
  pyshell.send(req.body.email);
  pyshell.send(req.body.check);
  pyshell.on('message', function (message) {
    console.log(message);  
  }); 

});
const port = process.env.PORT || 80;
app.listen(port);

console.log(`Randomised weight generator listening on ${port}`);
