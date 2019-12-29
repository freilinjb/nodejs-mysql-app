const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('./helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //Para poder revicir los datos dentro de la funcion que lo ejecuta
}, async (req, username, password, done) =>{ //Funcion que se activa al autenticar
   
    const { fullname } = req.body;
    console.log(req.body);
    let newUser = {
        username,
        password,
        fullname
    };
    //Cifra la clave antes de guardarla
    newUser.username = username.toLowerCase();
    newUser.password = await helpers.encryptPassword(newUser.password);
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    console.log('Clave',newUser.password);
    console.log(result);
}));

// passport.serializeUser((usr, done) =>{

// });