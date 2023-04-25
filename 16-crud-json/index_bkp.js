const http = require('node:http');
const fs = require('node:fs');
const querystring = require('node:querystring');

const jsonType = { 'Content-Type': 'application/json' };

function sendInternalServerError(res) {
    res.writeHead(500, {
        ...jsonType
    });
    res.end(JSON.stringify({
        httpStatusCode: 500,
        message: 'Internal Server Error',
        data: null
    }));
}

function sendNotFound(res) {
    res.writeHead(404, {
        ...jsonType
    });
    res.end(JSON.stringify({
        httpStatusCode: 404,
        message: 'Not Found',
        data: []
    }));
}

function sendBadRequest(res, field, message) {
    res.writeHead(400, {
        ...jsonType
    });
    res.end(JSON.stringify({
        httpStatusCode: 400,
        message: field + ' ' + message,
        data: null
    }));
}

const server = http.createServer(function (req, res) {
    if (req.url.match('/?id=*') && req.method === 'GET') {
        let q = querystring.parse(req.url.split('?')[1]);

        if (!q.id) sendBadRequest(res, 'Param ID', 'is requried');
        q.id = parseInt(q.id);

        fs.readFile('./data.json', 'utf-8', function (err, data) {
            if (err) sendInternalServerError(res);
            let existing = JSON.parse(data);
            let foundIndex = null;

            existing.forEach(function (data, index) {
                if (data.id === q.id) foundIndex = index;
            });

            if (foundIndex !== null) {
                res.writeHead(200, {
                    ...jsonType
                });
                res.end(JSON.stringify({
                    httpStatusCode: 200,
                    message: 'Success',
                    data: existing[foundIndex]
                }));
            }
            else sendNotFound(res);
        });
    }
    if (req.url.match('/') && req.method === 'GET') {
        fs.readFile('./data.json', 'utf-8', function (err, existing) {
            if (err) sendNotFound(res);

            res.writeHead(200, {
                ...jsonType
            });
            res.end(JSON.stringify({
                httpStatusCode: 200,
                message: 'Success',
                data: JSON.parse(existing)
            }));
        });
    }
    if (req.url.match('/') && req.method === 'POST') {
        req.on('data', function (data) {
            let jsondata = JSON.parse(data);

            fs.readFile('./data.json', 'utf-8', function (err, data) {
                let id = 0;
                let newData = [];

                if (err) {
                    id = 1;
                } else {
                    let existing = JSON.parse(data);

                    if (existing.length === 0) {
                        id = 1;
                    }
                    else {
                        newData = newData.concat(existing);
                        id = existing[existing.length - 1].id + 1;
                    }
                }

                jsondata.id = id;
                jsondata = {
                    ...jsondata
                }

                newData.push(jsondata);

                fs.writeFile('./data.json', JSON.stringify(newData), function (err) {
                    if (err) sendInternalServerError(res);

                    res.writeHead(201, {
                        ...jsonType
                    });
                    res.end(JSON.stringify({
                        httpStatusCode: 201,
                        message: 'Success',
                        data: jsondata
                    }));
                });
            });
        });
    }
    if (req.url.match('/') && req.method === 'PATCH') {
        req.on('data', function (data) {
            let foundIndex = null;
            let jsondata = JSON.parse(data);

            if (!jsondata.id) {
                sendBadRequest(res, 'Field ID', 'is required.');
            }

            fs.readFile('./data.json', 'utf-8', function (err, data) {
                if (err) sendInternalServerError(res);
                let existing = JSON.parse(data);

                existing.forEach(function (data, index) {
                    if (data.id === jsondata.id) foundIndex = index;
                });

                if (foundIndex !== null) {
                    if (jsondata.name) existing[foundIndex].name = jsondata.name;
                    if (jsondata.birthDay) existing[foundIndex].birthDay = jsondata.birthDay;
                    if (jsondata.role) existing[foundIndex].role = jsondata.role;

                    fs.writeFile('./data.json', JSON.stringify(existing), function (err) {
                        if (err) sendInternalServerError(res);

                        res.writeHead(200, {
                            ...jsonType
                        });
                        res.end(JSON.stringify({
                            httpStatusCode: 200,
                            message: 'Success',
                            data: existing[foundIndex]
                        }))
                    });
                }
                else {
                    sendNotFound(res);
                }
            });
        })
    }
    if (req.url.match('/?id=*') && req.method === 'DELETE') {
        let q = querystring.parse(req.url.split('?')[1]);

        if (!q.id) sendBadRequest(res, 'Param ID', 'is required.');

        q.id = parseInt(q.id);

        fs.readFile('./data.json', 'utf-8', function (err, data) {
            if (err) sendNotFound(res);

            let existing = JSON.parse(data);
            let foundIndex = null;

            existing.forEach(function (data, index) {
                if (data.id === q.id) foundIndex = index;
            });

            if (foundIndex !== null) {
                existing = existing.filter(function (data) {
                    return data.id !== q.id;
                });

                fs.writeFile('./data.json', JSON.stringify(existing), function (err) {
                    if (err) sendInternalServerError(res);

                    res.writeHead(200, {
                        ...jsonType
                    });
                    res.end(JSON.stringify({
                        httpStatusCode: 200,
                        message: 'Success',
                        data: null
                    }));
                });
            }
            else {
                sendNotFound(res);
            }
        });
    }
});

server.listen(3000, 'localhost', function () {
    console.log('Server is running');
});