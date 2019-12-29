const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/signup', (req, res) =>{
    res.render('auth/signup')
})

// router.post('/signup', (req, res) =>{
//     // console.log(req.body);
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile', //Enviar cuando todo este funcionando
//         failureRedirect: '/signup',
//         failureFlash: true  //Acepta enviar mensaje atravez de flash
//     });
//     res.send('received');
//      console.log(req.body);
// });

router.post('/signup', passport.authenticate('local.singup', {
    successRedirect: '/profile', //Enviar cuando todo este funcionando
    failureRedirect: '/signup',
    failureFlash: true 
}));

router.get('/profile', (req, res) =>{
    res.send('This is your Profile');
});

module.exports = router;