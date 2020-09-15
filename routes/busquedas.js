/**
    ruta:/api/todo/:busqueda
 */

const { Router } = require('express');
const { getTodo, getDocumentosCollecion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosCollecion);

module.exports = router;