const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT } = require('../middlewares')

const { existsCategoryById } = require('../helpers/db-validators')
const { createValueCategory } = require('../controllers/valuesCategories')

const router = Router()

// Obtener un value categoria por idCategory - publico
// router.get(
//   "/:id",
//   [
//     check("id", "No es un id de Mongo válido").isMongoId(),
//     check("id").custom(existsCategoryById),
//     // validateFields,
//   ],
//   getCategory
// );

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  '/',
  [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty()
    // validateFields,
  ],
  createValueCategory
)

module.exports = router
