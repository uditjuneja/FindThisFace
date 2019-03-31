
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
    cb(null, req.body.email+path.extname(file.originalname));
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
  console.log('width',req.body.width+' type:'+typeof +req.body.width);
  console.log('name with ext',req.body.email+'.'+req.body.fileExt)

  let {PythonShell} = require('python-shell')
  var pyshell = new PythonShell('load_final_img.py');
  var output_result = 'd';
  pyshell.send(req.body.width); // permi error (tolerance)
  pyshell.send(req.body.email+'.'+req.body.fileExt); //image_NAME with (extension)
  pyshell.on('message', function (message) {
    console.log('result',message);  
  
  }); 

res.send('predicted names: '+output_result);
});
const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Image feature extractor listening on ${port}`);
