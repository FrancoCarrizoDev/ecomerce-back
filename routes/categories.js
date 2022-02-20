const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validateFields } = require('../middlewares')

const {
  createCategory,
  getCategories,
  getCategory,
  updateProductCategory,
  deleteProductCategory
} = require('../controllers/categories')
const { existsCategoryById } = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/categorias
 */

router.get('/', getCategories)

router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
  ],
  getCategory
)

router.post(
  '/',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  createCategory
)

router.put(
  '/:id',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
  ],
  updateProductCategory
)

router.delete(
  '/:id',
  [
    validarJWT,
    // TODO hacer la parte del esAdminRole,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    // check("id").custom(existsCategoryById),
    validateFields
  ],
  deleteProductCategory
)

module.exports = router
