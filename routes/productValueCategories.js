const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validateFields, esAdminRole } = require("../middlewares");

const { getProducts } = require("../controllers/products");
const {
  createProductValueCategory,
  getProductValuesCategoryByCategoryId,
} = require("../controllers/productValueCategories");

const router = Router();

//  Obtener todas las categorias - publico
// router.get("/", getProducts);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [check("id", "No es un id de Mongo válido").isMongoId(), validateFields],
  getProductValuesCategoryByCategoryId
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("value", "El nombre es obligatorio").not().isEmpty(),
    check("product_category_id", "El id de la categoría es obligatorio")
      .not()
      .isEmpty(),
    check("product_category_id", "No es un id de Mongo válido").isMongoId(),
    validateFields,
  ],
  createProductValueCategory
);

module.exports = router;
