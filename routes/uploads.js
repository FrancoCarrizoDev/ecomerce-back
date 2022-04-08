const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validarArchivoSubir } = require('../middlewares')
const { uploadImgCloud, mostrarImagen } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers')

const router = Router()

router.post('/', [validarArchivoSubir, validateFields], uploadImgCloud)

router.get(
  '/:coleccion/:id',
  [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom((c) => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validateFields
  ],
  mostrarImagen
)

module.exports = router
