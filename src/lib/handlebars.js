const { format, register } = require('timeago.js');


//La funcion tiene que ser accedida por la vista
const helpers = {};



//El timestamp sera tomado desde la vista
helpers.timeago = (timestamp) =>{
//    return format(date[locate = 'es-ES',timestamp]);
   return format(timestamp,'es');
}

module.exports = helpers;