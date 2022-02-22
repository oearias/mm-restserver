const { Router } = require('express');
const { check } = require('express-validator');
const { mandaditosGet, mandaditoGet, 
        mandaditoDelete, mandaditoPut, 
        mandaditoPost } = require('../controllers/mandaditos');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', mandaditosGet);

router.get('/:id', mandaditoGet);

router.post('/', [
        check('email','El correo ingresado no tiene un formato válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min: 8}),
        //check('nombre', 'Se requiere el campo nombre').isLength({min: 2}), 
        validarCampos
],mandaditoPost);

router.put('/:id', mandaditoPut);

router.delete('/:id', mandaditoDelete);

module.exports = router;