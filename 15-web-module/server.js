const http = require('node:http')
const fs = require('node:fs')
// Import the promises variant to keep
// with modern JavaScript best practices
const _fs = require('node:fs').promises
const url = require('node:url')

const HOST = 'localhost'
const PORT = 3000

let indexFile = null

const server = http.createServer(function (req, res) {
    // routing
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write('<html><body><p>Home page.</p></body></html>')
        res.end()
    }
    else if (req.url == '/student') {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write('<html><body><p>Student page.</p></body></html>')
        res.end()
    }
    else if (req.url == '/admin') {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write('<html><body><p>Admin page.</p></body></html>')
        res.end()
    }
    else if (req.url == '/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.write(JSON.stringify({ message: 'Hello world' }))
        res.end()
    }
    else if (req.url == '/csv') {
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment;filename=nowo.csv')
        res.writeHead(200)
        res.end('id,name,email\n1,Nowo,nowo@test.com')
    }
    else if (req.url == '/html') {
        _fs.readFile(__dirname + '/index.html')
            .then(contents => {
                res.setHeader("Content-Type", "text/html")
                res.writeHead(200)
                res.end(contents)
            })
            .catch(err => {
                res.writeHead(500)
                res.end(err)
                return
            })
    }
    else if (req.url == '/htmlcatch') {
        if (indexFile !== null) {
            console.log('read from cache');
            res.setHeader("Content-Type", "text/html")
            res.writeHead(200)
            res.end(indexFile)
        }
        else {
            _fs.readFile(__dirname + '/index.html')
                .then(contents => {
                    indexFile = contents
                    res.setHeader("Content-Type", "text/html")
                    res.writeHead(200)
                    res.end(contents)
                })
                .catch(err => {
                    res.writeHead(500)
                    res.end(err)
                    return
                })
        }
    }
    else {
        // parse the request containing file name
        let pathname = url.parse(req.url).pathname

        // print path name
        console.log(`Request for ${pathname} received`)

        fs.readFile(pathname.substring(1), function (err, data) {
            if (err) {
                console.error(err)

                res.writeHead(404, { 'Content-Type': 'text/html' })
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' })

                res.write(data.toString())
            }

            res.end()
        })
    }


})

server.listen(PORT, HOST, function () {
    console.log(`Server running at http://${HOST}:${PORT}`)
})

