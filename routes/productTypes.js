const { Router } = require('express')
const { check } = require('express-validator')
const {
  getProductTypes,
  createProductType,
  getProductTypeById,
  updateProductType,
  deleteProductType
} = require('../controllers/productType')
const { validarJWT } = require('../middlewares')

const { validateFields } = require('../middlewares')

const router = Router()

router.get('/', getProductTypes)

router.get(
  '/:id',
  [check('id', 'El id debe ser válido').not().isEmpty().isMongoId(), validateFields],
  getProductTypeById
)

router.post(
  '/',
  [validarJWT, check('name', 'El nombre es obligatorio').not().isEmpty(), validateFields],
  createProductType
)

router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'El id debe ser válido').not().isEmpty().isMongoId(),
    check('name', 'El name debe ser válido').not().isEmpty(),
    validateFields
  ],
  updateProductType
)

router.delete(
  '/:id',
  [validarJWT, check('id', 'El id debe ser válido').not().isEmpty().isMongoId(), validateFields],
  deleteProductType
)

module.exports = router
