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

module.exports = router;