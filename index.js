const fs = require('fs');
const http = require('http');
const url = require('url');

//read the json data from the data file
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
//convert from string to js object
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;
    
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html'})
        res.end('this is the Products page');
    }

    else if (pathName === '/laptop' && id < laptopData.length ) {
        res.writeHead(200, { 'Content-type': 'text/html'})
        
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
                output = output.replace(/{%IMAGE%}/g, laptop.image);
                output = output.replace(/{%PRICE%}/g, laptop.price);
                output = output.replace(/{%SCREEN%}/g, laptop.screen);
                output = output.replace(/{%CPU%}/g, laptop.cpu);
                output = output.replace(/{%STORAGE%}/g, laptop.storage);
                output = output.replace(/{%RAM%}/g, laptop.ram);
                output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
            res.end(output);
        });

    }

    else {
        res.writeHead(404, { 'Content-type': 'text/html'})
        res.end('url not found on server');
    }
});

server.listen(1337, '127.0.0.1', () => {
    console.log('listening for requests')
});