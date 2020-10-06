let express = require('express');
let cookieParser = require('cookie-parser');
let moment = require('moment');

let app = express();
let apiRouter = require('./api/router');
let formRouter = require('./form/router');
let bodyParser = require('body-parser');
let path = require('path');
let pug = require('pug');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);
app.use('/form', formRouter);

app.use((req, res, next) => {
    if (req.cookies.currentTime == undefined) {
        let time = moment().format("HH:mm:ss");
        console.log(time);
        res.cookie('currentTime', time, {max_age: 900000, httpOnly: true});
        console.log(`Set cookie [currentTime] to : ${time}`);
    }
    next();
});

app.get('/', (req, res) => {
    res.write('Hello world\n');
    let time = req.cookies.currentTime;
    console.log(`Get cookie [currentTime]: ${time}`);
    res.end(time);
});

app.get('/results', (req, res) => {
    const rendered = pug.renderFile(path.join(__dirname, 'results.pug'));
    res.send(rendered);
});

app.get('/myroute/:param', (req, res) => {
    let param = req.params.param;
    res.send(param);
});

let PORT = 5000;
let server = app.listen(PORT, () => {
    console.log(`Server started at prot: ${PORT}.`);
});