const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validateFields, esAdminRole } = require('../middlewares')

const {
  createProductValueCategory,
  getProductValuesCategoryByCategoryId,
  disableProductValueCategory,
  editProductValueCategory
} = require('../controllers/productValueCategories')

const router = Router()

router.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), validateFields],
  getProductValuesCategoryByCategoryId
)

router.post(
  '/',
  [
    validarJWT,
    check('value', 'El nombre es obligatorio').not().isEmpty(),
    check('product_category_id', 'El id de la categoría es obligatorio')
      .not()
      .isEmpty(),
    check('product_category_id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
  ],
  createProductValueCategory
)

router.put(
  '/:id',
  [
    validarJWT,
    check('value', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El id del valor de categoría es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
  ],
  editProductValueCategory
)

router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateFields
  ],
  disableProductValueCategory
)

module.exports = router
