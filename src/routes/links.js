const express = require('express');
const router = express.Router();

//Coneccion de base de dato
const pool = require('../database');
const { isLoggetIn } = require('../lib/auth');
//PROBANDO SI FUNCIONA EL DIRECTORIO
// router.get('/add', (req, res)=>{
//     res.send('form');
// })


router.get('/add', isLoggetIn, (req, res)=>{
    res.render('links/add', {title: 'Add new Link'});
});

//Funcion async - asincrona
router.post('/add',isLoggetIn, async (req,res) =>{
    // console.log(req.body);

    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    //Esto va a tomar tiempo
    console.log(newLink);
    
    // await pool.query('INSERT INTO links(title,url,description) VALUES(?,?,?)',title,url,description);
    await pool.query('INSERT INTO links set ?',[newLink]);
    // console.log('INSERT INTO links set ?',[newLink]);
    req.flash('success','Link saved successfully');
    res.redirect('/links',)
});

router.get('/',isLoggetIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
    console.log(links);
    // res.send('Listas iran aqui')
    res.render('links/list', {links, title: 'Lista de enlace'});
    
});

router.get('/delete/:id',isLoggetIn, async(req,res)=>{
    // console.log(req.params.id);
    // res.send('DELETED');
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success','Link Removed successfully');
    res.redirect('/links');
});

router.get('/edit/:id',isLoggetIn, async(req,res)=>{
    // console.log(req.params.id);
    // res.send('DELETED');
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(link[0]);
    //Como devuelve un arreglo de objeto se tiene que manejar desde la posicion 0
    res.render('links/edit', {link: link[0]});
});

router.post('/edit/:id', isLoggetIn, async(req, res)=>{
    const { id } = req.params;
    const { title, url, description } = req.body;

    const newLink = {
        title,
        url,
        description
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);
    req.flash('success','Link Updated successfully');
    res.redirect('/links');
});

module.exports = router;