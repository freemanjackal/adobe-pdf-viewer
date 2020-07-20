const express = require('express');
const fs = require('fs');
var cors = require('cors');
const path = require('path');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express();
app.use(express.static('/client/build/static'))
app.use(express.static(path.join(__dirname,"/client/build")));

app.get('/', (req, res) => {
  		res.sendFile(path.join(__dirname,'/client/build','index.html'));

});


app.options('/file', cors())
app.get('/file', cors(corsOptions), (req, res) => {
//  const file = './pdfs/solid.pdf';
  const file = path.join(__dirname,'/pdfs/solid.pdf')
  res.sendFile(file);
  
});


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
