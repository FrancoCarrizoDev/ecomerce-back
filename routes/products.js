const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validateFields, esAdminRole } = require('../middlewares')

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

const { existsProductById } = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', getProducts)

// Obtener una categoria por id - publico
router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
  ],
  getProduct
)

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio debe ser mayor o igual a 0').not().isEmpty(),
    check('quantity', 'La cantidad debe ser mayor o igual a 0').not().isEmpty(),
    // check("quantity").custom(existeCategoriaPorId),
    validateFields
  ],
  createProduct
)

// Actualizar - privado - cualquiera con token válido
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
  ],
  updateProduct
)

// Borrar una categoria - Admin
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
  ],
  deleteProduct
)

module.exports = router
