const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validarJWT } = require('../middlewares')

const {
  getProductTypeCategories,
  createTypeCategory,
  updateProductTypeCategory,
  deleteProductTypeCategory
} = require('../controllers/productTypeCategories')
const { existsCategoryById } = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/product-typecategories
 */

router.get('/', getProductTypeCategories)

router.get(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
  ],
  getProductTypeCategories
)

router.post(
  '/',
  [validarJWT, check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields],
  createTypeCategory
)

router.put(
  '/:id',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
  ],
  updateProductTypeCategory
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
  deleteProductTypeCategory
)

module.exports = router
