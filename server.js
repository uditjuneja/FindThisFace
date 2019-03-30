const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
console.log('kkya hal');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './target/');
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, 'p'+(file.originalname).substring((file.originalname).indexOf("."),(file.originalname).length ));
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
  var pyshell = new PythonShell('load_final_img.py');
  pyshell.send(req.body.width); // permi error (tolerance)
  pyshell.send(req.body.email); //image_NAME with (extension)
  pyshell.on('message', function (message) {
    console.log('result',message);  
  }); 

res.send('Done uploading files: '+req.files.length);
});
const port = process.env.PORT || 8081;
app.listen(port);

console.log(`Image feature extractor listening on ${port}`);
