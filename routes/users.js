const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validarJWT, tieneRole } = require("../middlewares");

const {
  isValidRole,
  emailExists,
  existsUserById,
} = require("../helpers/db-validators");

const {
  getUsers,
  usuariosPut,
  createUser,
  usuariosDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    check("rol").custom(isValidRole),
    validateFields,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("email", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExists),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("role").custom(isValidRole),
    validateFields,
  ],
  createUser
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  usuariosDelete
);

module.exports = router;
