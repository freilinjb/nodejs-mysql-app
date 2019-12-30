module.exports = {
    isLoggetIn(req, res, next){//Devuelve un true si el usuario se ha logueado
        if(req.isAuthenticated()){//Metodo de passport que nos ha problado del objeto reques
            return next();
        }
        return res.redirect('/signin');//Si no he logueado redireccionalo a signin para que se loguee primero
    },

    isNotLoggetIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        else{
            return res.redirect('/profile');
        }
    }
}; 

