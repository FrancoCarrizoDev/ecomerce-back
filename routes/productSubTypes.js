const { Router } = require('express')
const { check } = require('express-validator')
const {
  getProductSubTypes,
  createProductSubType,
  updateProductSubType,
  deleteProductSubType,
  getProductsSubTypesByTypeId
} = require('../controllers/productSubType')

const { validateFields } = require('../middlewares')

const router = Router()

router.get('/', getProductSubTypes)

router.get(
  '/:productTypeFk',
  [check('productTypeFk', 'No es un id de Mongo válido').isMongoId(), validateFields],
  getProductsSubTypesByTypeId
)

router.post(
  '/',
  [check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields],
  createProductSubType
)

router.put(
  '/:id',
  [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  updateProductSubType
)

router.delete(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), validateFields],
  deleteProductSubType
)

module.exports = router
