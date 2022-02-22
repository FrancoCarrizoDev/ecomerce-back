const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields, validarJWT } = require('../middlewares')

const {
  getProductTypeValuesCategoryByCategoryId,
  createProductTypeValueCategory
} = require('../controllers/productTypeValueCategories')

const router = Router()

/**
 * {{url}}/api/product-type-values-categories
 */

router.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), validateFields],
  getProductTypeValuesCategoryByCategoryId
)

router.post(
  '/',
  [validarJWT, check('value', 'El nombre es obligatorio').not().isEmpty(), validateFields],
  createProductTypeValueCategory
)

// router.put(
//   '/:id',
//   [
//     validarJWT,
//     check('name', 'El nombre es obligatorio').not().isEmpty(),
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     validateFields
//   ],
//   updateProductCategory
// )

// router.delete(
//   '/:id',
//   [
//     validarJWT,
//     // TODO hacer la parte del esAdminRole,
//     check('id', 'El id es obligatorio').not().isEmpty(),
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     // check("id").custom(existsCategoryById),
//     validateFields
//   ],
//   deleteProductCategory
// )

module.exports = router
