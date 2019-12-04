const http = require('http');
const fs = require('fs');
const url = require('url');

function sendDataToClient(res, fileName){
  fs.readFile(`${fileName}.html`, 'utf-8', (err, data) => {
    if (err) {
      if(err.code === 'ENOENT'){
          //tnayin
      }
    } else {
      res.write(data);
    }
    res.end();
  });
}


http.createServer((req,res) => {
  res.writeHead(200);
  //const { page } = url.parse(req.url, true).query;
  const { query : {page} } = url.parse(req.url, true);

  switch (page) {
  case 'home': sendDataToClient(res, 'index');
    break;
  case 'contact': sendDataToClient(res, 'contact');
    break;
  case 'news': sendDataToClient(res, 'news');
    break;
  default: sendDataToClient(res, '404');
    break;
  }

}).listen(8080);
