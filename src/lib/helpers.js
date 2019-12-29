const bcrypt = require('bcryptjs');

const helpers = {};

//Para cuando el usuario se registra
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); //Genera un patron
    const hash = await bcrypt.hash(password,salt) // Sifra la clave basado en las cadenas
    return hash;
};

//Para el logueo -- Le puedes poner el nombre que quieras
helpers.matchPassword = async (password, savedPassword) => {
    try
    {
        // console.log(password);
       return await bcrypt.compare(password,savedPassword);
    }
    catch(e)
    {
        //Se puede usar en un midlavare para que envie el error o enviar por flash un mensaje - De todo
        console.log(e);
    }
};

module.exports = helpers;
