const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validateFields } = require('../middlewares')

const { existsProductById } = require('../helpers/db-validators')
const {
  getProductTycValTyc,
  getProductTycValTycById,
  createProductTycValTyc,
  updateProductTycValTyc
} = require('../controllers/productTycValTyc')

const router = Router()

router.get('/', getProductTycValTyc)

router.get(
  '/:id',
  [check('id', 'No es un id de Mongo válido').isMongoId(), validateFields],
  getProductTycValTycById
)

router.post(
  '/',
  // [
  //   validarJWT,
  //   check('name', 'El nombre es obligatorio').not().isEmpty(),
  //   check('price', 'El precio debe ser mayor o igual a 0').not().isEmpty(),
  //   check('quantity', 'La cantidad debe ser mayor o igual a 0').not().isEmpty(),
  //   // check("quantity").custom(existeCategoriaPorId),
  //   validateFields
  // ],
  createProductTycValTyc
)

// // Actualizar - privado - cualquiera con token válido
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
  ],
  updateProductTycValTyc
)

// // Borrar una categoria - Admin
// router.delete(
//   '/:id',
//   [
//     validarJWT,
//     esAdminRole,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom(existsProductById),
//     validateFields
//   ],
//   deleteProduct
// )

module.exports = router
