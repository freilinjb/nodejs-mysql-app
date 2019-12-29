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

//Funcion async - asincrona
router.post('/add', async (req,res) =>{
    // console.log(req.body);

    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    }
    //Esto va a tomar tiempo
    console.log(newLink);
    
    // await pool.query('INSERT INTO links(title,url,description) VALUES(?,?,?)',title,url,description);
    await pool.query('INSERT INTO links set ?',[newLink]);
    // console.log('INSERT INTO links set ?',[newLink]);
    
    res.send('Reciviend');
});

router.get('/', async (req, res) =>{
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    // res.send('Listas iran aqui')
    res.render('links/list', {links});
    
});

router.get('/delete/:id', async(req,res)=>{
    console.log(req.params.id);
    res.send('DELETED');
})

module.exports = router;