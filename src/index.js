const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path  = require('path');


//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir:  path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars').default
    
}))

app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
// //Aceptar los datos (formulkarios) que envia el usuario
app.use(express.urlencoded({extended: false}));
// //Para recibir JSON desde nuestra aplicacion - y validar lo que podemos conseguir en futuras mejoras
app.use(express.json());

//Global Variables
//Toma la informacion del usuario, toma lo que el servidor quiere reponder, toma una funcion para continuar el resto del codigo
app.use((req, res, next) =>{
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication').default.default.default);
app.use('/links',require('./routes/links'));
//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})