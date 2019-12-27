const express = require('express');
const router = express.Router();

//Coneccion de base de dato
const pool = require('../database');

//PROBANDO SI FUNCIONA EL DIRECTORIO
// router.get('/add', (req, res)=>{
//     res.send('form');
// })


router.get('/add', (req, res)=>{
    res.render('links/add');
})


router.post('/add', (req,res) =>{
    // console.log(req.body);

    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    }
    console.log(newLink);
    
    res.send('Reciviend');
})

module.exports = router;