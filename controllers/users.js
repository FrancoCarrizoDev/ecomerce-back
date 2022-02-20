const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const { User } = require('../models')

const getUsers = async (req = request, res = response) => {
  const { limit = 5, skip = 0 } = req.query
  const query = { enabled: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(skip)).limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body
  const usuario = new User({ name, email, password, role: 'USER_ROLE' })

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt)

  // Guardar en BD
  await usuario.save()

  res.json({
    usuario
  })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, correo, ...resto } = req.body

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await User.findByIdAndUpdate(id, resto)

  res.json(usuario)
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params
  const usuario = await User.findByIdAndUpdate(id, { estado: false })

  res.json(usuario)
}

module.exports = {
  getUsers,
  createUser,
  usuariosPut,
  usuariosDelete
}
