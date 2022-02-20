const validaCampos = require('./validate-fields')
const validarJWT = require('./validate-jwt')
const validaRoles = require('./validate-roles')
const validarArchivo = require('./validate-file')

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validaRoles,
  ...validarArchivo
}
