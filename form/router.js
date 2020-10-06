let {Router} = require('express');
let router = Router();
let moment = require('moment');
let bodyParser = require('body-parser');
let fs = require('fs');
let path = require('path');
let pug = require('pug');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req, res) => {
    const rendered = pug.renderFile(path.join(__dirname, 'form.pug'));
    res.send(rendered);
});

router.post('/', (req, res) => {
    console.log(req.body);
    let {username, password, agree = false, gender} = req.body;
    users.push({username, password, agree, gender});
    res.redirect('/results');
});

module.exports = router