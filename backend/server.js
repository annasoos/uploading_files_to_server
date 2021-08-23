const express = require('express');
const path = require('path');
const server = express(); 
const formidable = require('formidable');
//const bodyParser = require('body-parser');

server.use('/public', express.static(path.join(__dirname, '../frontend/public/')));

server.get('/', (req, res) => {
  res.sendFile(
      path.join(__dirname, '../frontend/index.html')
    );
});

server.post('/', (req, res, next) => {  

  const form = formidable({ multiples: true, uploadDir: path.join(__dirname, '/upload') })
 
  form.parse(req, (err, fields, files) => {
    
    if (err) {
      next(err);
      return;
    }

    const fileNames = Object.keys(files);
    
    //res.json({ fields, files });
    res.json({fileNames})
    console.log(fileNames)

  });
});

const port = 6789;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});