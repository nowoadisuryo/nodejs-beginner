const http = require('node:http');
const fs = require('node:fs');
const querystring = require('node:querystring');

const contentTypeJSON = { 'Content-Type': 'application/json' }

let sendResponse = function (res, httpStatusCode, message, data) {
    res.writeHead(httpStatusCode, {
        ...contentTypeJSON
    });
    res.end(JSON.stringify({
        httpStatusCode: httpStatusCode,
        message: message,
        data: data
    }));
}

const responseMessage = {
    NOT_FOUND: "Data was not found.",
    ID_PARAM_REQUIRED: "ID parameter is required.",
    INTERNAL_SERVER_ERROR: "Internal server error.",
    SUCCESS: "Success.",
}

const httpStatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

const server = http.createServer(function (req, res) {
    if (req.url.match('/?id=') && req.method === 'GET') {
        let urlParameter = querystring.parse(req.url.split('?')[1]);

        if (!urlParameter.id) sendResponse(res, httpStatusCode.BAD_REQUEST, responseMessage.ID_PARAM_REQUIRED, null);

        urlParameter.id = parseInt(urlParameter.id);

        fs.readFile('./data.json', 'utf-8', function (error, data) {
            if (error) sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, null);
            else {
                const existingData = JSON.parse(data);
                const foundData = existingData.filter(data => data.id === urlParameter.id)[0] || null;
                if (foundData !== null) sendResponse(res, httpStatusCode.OK, responseMessage.SUCCESS, foundData);
                else sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, foundData);
            }
        });
    }
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile('./data.json', 'utf-8', function (error, data) {
            if (error) sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, null);
            else {
                const existingData = JSON.parse(data);
                sendResponse(res, httpStatusCode.OK, responseMessage.SUCCESS, existingData);
            }
        });
    }
    if (req.url === '/' && req.method === 'POST') {
        req.on('data', function (data) {
            let userInput = JSON.parse(data);

            fs.readFile('./data.json', 'utf-8', function (error, data) {
                let id;
                let newData = [];

                if (error) id = 1;
                else {
                    const existingData = JSON.parse(data);

                    if (existingData.length === 0) id = 1;
                    else {
                        id = existingData[existingData.length - 1].id + 1;
                        newData = newData.concat(existingData);
                    }
                }

                userInput.id = id;
                newData.push(userInput);

                fs.writeFile('./data.json', JSON.stringify(newData), function (error) {
                    if (error) sendResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR, null);
                    else sendResponse(res, httpStatusCode.CREATED, responseMessage.SUCCESS, userInput);
                });
            });
        });
    }
    if (req.url.match('/?id=') && req.method === 'PATCH') {
        req.on('data', function (data) {
            let userInput = JSON.parse(data);
            let urlParameter = querystring.parse(req.url.split('?')[1]);

            if (!urlParameter.id) sendResponse(res, httpStatusCode.BAD_REQUEST, responseMessage.ID_PARAM_REQUIRED, null);

            urlParameter.id = parseInt(urlParameter.id);

            fs.readFile('./data.json', function (error, data) {
                if (error) sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, null);
                else {
                    let existingData = JSON.parse(data);
                    const foundIndex = existingData.findIndex(data => data.id === urlParameter.id);

                    if (foundIndex >= 0) {
                        if (userInput.name) existingData[foundIndex].name = userInput.name;
                        if (userInput.birthDay) existingData[foundIndex].birthDay = userInput.birthDay;
                        if (userInput.role) existingData[foundIndex].role = userInput.role;

                        fs.writeFile('./data.json', JSON.stringify(existingData), function (error) {
                            if (error) sendResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR, null);
                            else sendResponse(res, httpStatusCode.OK, responseMessage.SUCCESS, existingData[foundIndex]);
                        })
                    }
                    else {
                        sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, null);
                    }
                }
            });
        });
    }
    if (req.url.match('/?id=') && req.method === 'DELETE') {
        let urlParameter = querystring.parse(req.url.split('?')[1]);

        if (!urlParameter.id) sendResponse(res, httpStatusCode.BAD_REQUEST, responseMessage.ID_PARAM_REQUIRED, null);

        urlParameter.id = parseInt(urlParameter.id);

        fs.readFile('./data.json', function (error, data) {
            if (error) sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, null);
            else {
                let existingData = JSON.parse(data);
                let foundIndex = existingData.findIndex(data => data.id === urlParameter.id);

                if (foundIndex < 0) sendResponse(res, httpStatusCode.NOT_FOUND, responseMessage.NOT_FOUND, null);
                else {
                    const newData = existingData.filter(data => data.id !== urlParameter.id);

                    fs.writeFile('./data.json', JSON.stringify(newData), function (error) {
                        if (error) sendResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR, null);
                        else sendResponse(res, httpStatusCode.OK, responseMessage.SUCCESS, null);
                    });
                }
            }
        });
    }
});

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, function () {
    console.log('Sever is running.');
});