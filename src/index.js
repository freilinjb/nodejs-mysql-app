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
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views', 'partials')),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine','.hbs');
//Middlewares
app.use(morgan('dev'));
//Aceptar los datos que envia el usuario
app.use(express.urlencoded({extends: false}));
//Para recibir JSON desde nuestra aplicacion
app.use(express.json());

//Global Variables


//Routes
app.use(require('./routes/index'));
//Public

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})