const http = require('node:http')

let options = {
    host: 'localhost',
    port: '3000',
    path: '/index.html'
}

let callback = function (res) {
    // continously update stream with data
    let body = ''

    res.on('data', function (data) {
        body += data
    })

    res.on('end', function () {
        console.log(body)
    })
}

let req = http.request(options, callback)

req.end()