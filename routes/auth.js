const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')

const { login, googleSignin, renewToken } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.post(
  '/login',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  login
)

router.post(
  '/google',
  [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validateFields
  ],
  googleSignin
)

router.post(
  '/renew',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  login
)

router.get('/renew', validarJWT, renewToken)

module.exports = router
