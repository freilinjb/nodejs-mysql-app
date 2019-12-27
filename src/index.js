const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path  = require('path');

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);

app.set('views',path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    //Agregando la carpeta layouts a para que nodejs la reconosca
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //Agregando la carpeta partialas para que njs la reconosca
    partialsDir: path.join(app.get('views', 'partials')),
    //extension del motor de plantilla
    extname: '.hbs',
    //Confirugacion del motor de plantilla
    helpers: require('./lib/handlebars')
}));
//Motor de plantilla
app.set('view engine','.hbs');
//Middlewares
app.use(morgan('dev'));
//Aceptar los datos que envia el usuario
app.use(express.urlencoded({extends: false}));
//Para recibir JSON desde nuestra aplicacion
app.use(express.json());

//Global Variables
//Toma la informacion del usuario, toma lo que el servidor quiere reponder, toma una funcion para continuar el resto del codigo
app.use((req, res, next) =>{
    next();
})

//Routes
app.use(require('./routes/index'));
//Public

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})