let {Router} = require('express');
let router = Router();
let path = require('path');
let pug = require('pug');
const { validate, ValidationError, Joi } = require('express-validation')

const loginValidation = {
    body: Joi.object({
      username: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{8,30}/).required(),
      gender: Joi.string().valid(...['male', 'female']).required(),
      agree: Joi.boolean()
    }),
}

router.get('/', (req, res) => {
    const rendered = pug.renderFile(path.join(__dirname, 'form.pug'));
    res.send(rendered);
});

router.post('/', validate(loginValidation, {}, {}), (req, res) => {
    console.log(req.body);
    let {username, password, agree = false, gender} = req.body;
    users.push({username, password, agree, gender});
    res.redirect('/results');
});

module.exports = router