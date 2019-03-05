
const express  = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const keys =  require('../../config/keys');
 const passport = require('passport')
// const passport = require('../config/passport')


//Load imput Validation
const  validateRegisterInput = require ('../../validation/register')

// Load user model
const User = require('../../models/User');


router.get('/test', (req,res) => res.json({msg: 'user works'}))

router.post('/register', (req, res) => {

    //  res.json({msg: 'user works'})
    //  })
    const { erros, isValid }  = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(console.log ('ERRORRR',errors))
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'email exsists'})
        } else {
            const avatar = gravatar.url(req.body.email, {
                s:'200',
                r:'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    // if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                     .catch(err => console.log(err,'ERROR'))
                })
            })
        }
    })
});


router.post('/login', (req,res) => {
    const email = req.body.email
    const password = req.body.password

User.findOne({email})
.then(user => {
    if(!user){
        return res.status(404).json({email: 'user not found'})
    }

    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if(isMatch) {
            
            const payload = {id: user.id, name: user.name, avatar: user.avatar };
            jwt.sign
            (payload, keys.secretOrPrivateKey, 
            {expiresIn: 4500}, 
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            });
        } else {
            return res.status(400).json({password: 'Incorrect Password'});
        }
    })
});

});


// router.get('/current', (req,res) => res.json({msg: 'user works'}))

// Protected Routes

router.get (
    '/current',
     passport.authenticate('jwt', {session: false }), 
    (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email:req.user.email
    });
})


module.exports = router;

