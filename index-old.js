const http = require('http');
const fs = require('fs');

/**
 * @function sendData
 * send html data to client  //description function
 *
 * @param {Object} res - response object
 * @param {String} data - html content
 * @param {Number} statusCode - http status code
 **/
function sendData(res,data, statusCode = 500) {
    res.writeHead(statusCode, {
        'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
}

//comment /** + enter
/**
 * @function sendDataToClient
 * send html data to client  //description function
 *
 * @param {Object} res - response object
 * @param {String} fileName - file name
 * @param {Number} statusCode - http status code
 */

function sendDataToClient(res, fileName = 'index.html', statusCode = 200){
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err){
           return sendData(res,'<h1>500</h1>')
        }
            sendData(res,data,statusCode)
    });
}

/**
 *
 * @param {Object} res - response object
 * @param {Object} req - request object
 *
 */
http.createServer((req,res) => {
    switch (req.url) {
        case '/': sendDataToClient(res);
            break;
        case '/contact': sendDataToClient(res, 'contact.html');
            break;
        case '/news': sendDataToClient(res, 'new.html'); // ete filenam@ sxal enq gre mezi xrge 500 error serveric... true /'news.html'
            break;
        default: sendDataToClient(res, '404.html', 404);
    }
}).listen(8020);
