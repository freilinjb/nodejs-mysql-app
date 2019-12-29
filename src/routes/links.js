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
    res.redirect('/links')
});

router.get('/', async (req, res) =>{
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    // res.send('Listas iran aqui')
    res.render('links/list', {links});
    
});

router.get('/delete/:id', async(req,res)=>{
    // console.log(req.params.id);
    // res.send('DELETED');
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async(req,res)=>{
    // console.log(req.params.id);
    // res.send('DELETED');
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(link[0]);
    //Como devuelve un arreglo de objeto se tiene que manejar desde la posicion 0
    res.render('links/edit', {link: link[0]});
});

router.post('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const { } = req.body;

    const { title, url, description } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    console.log(newLink);
    res.send('UPDATED')
    
});

module.exports = router;