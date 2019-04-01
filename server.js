
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

  console.log('file name: '+ req.body.email+'.'+((req.body.fileExt).toString()).toLowerCase());
  console.log('permi error: ',req.body.width);
  var results=[{name:'NAN',rollno:'NAN'}]
  let {PythonShell} = require('python-shell')
  var pyshell = new PythonShell('load_final_img.py');
  console.log('pyshell was called');
 
  
  pyshell.send(req.body.width); // permi error (tolerance)
  pyshell.send(req.body.email+'.'+((req.body.fileExt).toString())); //image_NAME with (extension)
  pyshell.on('message', function (message) {
    console.log('message',message);
    // s=message.split(" ");
    // if(s.length>2){
    //   results.push({name:(s[0]).concat(s[1]),rollno:s[2]});
    // }
    // else{
    //   results.push({name:s[0],rollno:s[1]});
    // }
    s=message.split(" ");
    for(var i=0;i<s.length;i=i+2){
      results.push({name:s[i],rollno:s[i+1]});
    }
    y();


    
 }); 
  

    // pyshell.end(function (err,code,signal,res) {
    //     console.log('end')
    //     y();
        

    // })
    function y(){
    
      res.send(results);
    }

  });
 
const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Image feature extractor listening on ${port}`);
