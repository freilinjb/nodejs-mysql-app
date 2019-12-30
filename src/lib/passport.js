const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    //Pregunta si el usuario existe
    const rowsDataTable = await pool.query('SELECT * FROM users WHERE username = ?',[username]);

    if(rows.length > 0){
        const user = rowsDataTable[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','Welcome ' + user.username));
        }
        else{
            done(null,false, req.flash('message','Icorrect Password'));
        }
    }else{ //Si no encuentra ningun usuario
        return done(null, false, req.flash('message','The usersname does not exists'));
    }
}));

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
    newUser.id =  result.insertId; //El result hay una propiedad que devuelte el IdInsertado
    return done(null, newUser); //El null es porque no va a devolver ningun null
}));

//Guardo el Id del usuario
passport.serializeUser((user, done) =>{
    done(null,user.id);
});

//Toma el id para volver a optener los datos
passport.deserializeUser(async (id,done) => {
    //Devuelve un arreglo
    const rows = await pool.query('SELECT * FROM users WHERE id = ?',[id]);
    done(null, rows[0]);
});