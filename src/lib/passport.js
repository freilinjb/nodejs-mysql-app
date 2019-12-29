const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.singup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //Para poder revicir los datos dentro de la funcion que lo ejecuta
}, async (req, username, password, done) =>{ //Funcion que se activa al autenticar

    console.log(req.body);
}));

// passport.serializeUser((usr, done) =>{

// });