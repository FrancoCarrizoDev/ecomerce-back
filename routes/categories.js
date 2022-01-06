const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validateFields, esAdminRole } = require("../middlewares");

const {
  createCategory,
  getCategories,
  getCategory,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categories");
const { existsCategoryById } = require("../helpers/db-validators");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get("/", getCategories);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategoryById),
    validateFields,
  ],
  getCategory
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existsCategoryById),
    validateFields,
  ],
  actualizarCategoria
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategoryById),
    validateFields,
  ],
  borrarCategoria
);

module.exports = router;
