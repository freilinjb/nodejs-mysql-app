const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    req.flash('styles','styles');
    res.render('index');
});

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.get('/',(req, res) => {
//     res.send('Hello world');
// })

// module.exports = router;
