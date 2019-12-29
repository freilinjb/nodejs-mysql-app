const express = require('express');
const router = express.Router();

const passport = require('../lib/passport');

router.get('/signup', (req, res) =>{
    res.render('auth/signup')
})

router.post('/signup', (req, res) =>{
    // console.log(req.body);
    passport.authenticate('local.signup', {
        successRedirect: '/profile' //Enviar cuando todo este funcionando
    });
    res.send('received');
});

module.exports = router;