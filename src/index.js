const express = require('express');
const morgan = require('morgan');//midleware
const exphbs = require('express-handlebars');
const path  = require('path');
const flash = require('connect-flash')//midleware
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');//midleware

const { database } = require('./keys');

//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir:  path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
    
}))

app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,//Para que no se renueve la secion
    saveUninitialized: false, //Para que no se vuelva a establecer la secion
    store: new MySQLStore(database)//Esta propiedad dice donde va a guardar la secion de la base de dato //MySQLStore - necesita la clave de sql
}));
app.use(flash());
app.use(morgan('dev'));
// //Aceptar los datos (formulkarios) que envia el usuario
app.use(express.urlencoded({extended: false}));
// //Para recibir JSON desde nuestra aplicacion - y validar lo que podemos conseguir en futuras mejoras
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global Variables
//Toma la informacion del usuario, toma lo que el servidor quiere reponder, toma una funcion para continuar el resto del codigo
app.use((req, res, next) =>{
    //Hacer disponible este mensaje desde todas las vistas
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;//Dato de secion del usuario
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));
//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});