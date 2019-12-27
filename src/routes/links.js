const express = require('express');
const router = express.Router();

//Coneccion de base de dato
const pool = require('../database');

router.get('/add', (req, res)=>{
    res.send('form');
})

module.exports = router;