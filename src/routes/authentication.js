const express = require('express');
const router = express.Router();
const { isLoggetIn, isNotLoggetIn } = require('../lib/auth');
const passport = require('passport');

//Este medodo no deve protegerse, ya que es solo para que el usuario se registre
router.get('/signup', isNotLoggetIn, (req, res) => { //isNotLoggetIn redirecciona a profile si el usuario esta logueado ya
    res.render('auth/signup');
});

// router.post('/signup', (req, res) =>{
//     // console.log(req.body);
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile', //Enviar cuando todo este funcionando
//         failureRedirect: '/signup',
//         failureFlash: true  //Acepta enviar mensaje atravez de flash
//     });
//     res.send('received');
// });

router.post('/signup', isNotLoggetIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/signin',isNotLoggetIn, (req, res) =>{
      res.render('auth/signin');
  })

  //Proceso de autenticacion
  router.post('/signin', (req, res, next) =>{
      passport.authenticate('local.signin', {
          successRedirect: '/profile',
          failureRedirect: '/signin',
          failureFlash: true
      })(req, res, next)
  });


//Primero verifica si el usuario se ha registrado si no verifica la funcion isLoggetIn que lo redirecciona signin
router.get('/profile', isLoggetIn, (req, res) =>{
    res.render('profile');
});

router.get('/logout', (req, res) =>{
    req.logOut(); 
    res.redirect('/signin');
});

module.exports = router;