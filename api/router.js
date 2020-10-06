let {Router} = require('express');
let router = Router();
let moment = require('moment');
let bodyParser = require('body-parser');
let multer = require('multer');
let fs = require('fs');
let path = require('path');

/*
 Have following api endpoints
        - GET /api/time - returns current time in {time: current_time} format
        - POST /api/users - accepts user data in following format {username: String, gender: 
        String, agree: Boolean, password: String} and saves to the array
        - GET /api/users - returns the array of users in json format

*/

router.use('/users', bodyParser.json());
router.use('/users', bodyParser.urlencoded({extended: true}));

router.get('/time', (req, res) => {
    let currentTime = moment().format('HH:mm:ss');
    res.json({time: currentTime});
});

//users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), {encoding: 'utf8'}));
users = [];

router.post('/users', multer().none(), (req, res) => {
    console.log(req.body);
    let {username, password, agree, gender} = req.body;
    users.push({username, password, agree, gender});
    //fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users));
    res.send('New user added to database.');
});

router.get('/users', (req, res) => {
    res.json(users);
});

module.exports = router