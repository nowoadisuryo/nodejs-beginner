import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import Joi from 'joi';

const __dirname = fileURLToPath(dirname(import.meta.url));

const app = express();

// Using middleware

// Hide static folder
app.use('/public', express.static(join(__dirname, 'static')));

// Parse URL Encoded Data input
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON input
app.use(bodyParser.json());

// Custom middleware
app.use('/example', (req, res, next) => {
    console.log(req.url, req.method);
    next()
});

// Set view engine
app.set('view engine', 'ejs');

// Using express router
import {router as peopleRouter} from './routes/people.js'

app.use('/people', peopleRouter);

// Routes

app.get('/static', (req, res) => {
    res.sendFile(join(__dirname, 'static', 'index.html'));
})

app.get('/form', (req, res) => {
    res.sendFile(join(__dirname, 'static', 'form.html'));
});

app.post('/form', (req, res) => {
    const schema = Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().min(6).required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        res.send('An error has occurred');
        console.log(error);
    } else {
        res.send('Successfully post data')
    }

});

// Example EJS
app.get('/:userQuery', (req, res) => {

    res.render('index', {
        data: {
            userQuery: req.params.userQuery,
            searchResult: ['book1', 'book2', 'book3'],
            loggedIn: true,
        }
    });
});

app.get('/example', (req, res) => {
    res.send("Hitting example route\n");
});

// For optional parameter
app.get('/example/query', (req, res) => {
    console.log(req.query);
    res.send(req.query);
});

// For required parameter
app.get('/example/:name/:age', (req, res) => {
    console.log(req.params);
    res.send(`${req.params.name} : ${req.params.age}`);
});

app.listen(3000);