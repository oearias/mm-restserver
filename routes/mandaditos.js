const { Router } = require('express');
const { mandaditosGet, mandaditoGet, 
        mandaditoDelete, mandaditoPut, 
        mandaditoPost } = require('../controllers/mandaditos');


const router = Router();

router.get('/', mandaditosGet);

router.get('/:id', mandaditoGet);

router.post('/', mandaditoPost);

router.put('/:id', mandaditoPut);

router.delete('/:id', mandaditoDelete);

module.exports = router;