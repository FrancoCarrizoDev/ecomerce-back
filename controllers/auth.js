const { response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { generarJWT } = require('../helpers/generate-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        msg: 'Usuario / Password no son correctos'
      })
    }

    // SI el usuario está activo
    if (!user.enabled) {
      return res.status(401).json({
        msg: 'Su cuenta ha sido bloqueada, por favor comuníquese con soporte'
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos'
      })
    }

    // Generar el JWT
    const token = await generarJWT(user.id)
    const { role } = user

    if (role === 'ADMIN_ROLE') {
      return res.json({
        user,
        token
      })
    }
    delete user._doc.role

    return res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body

  try {
    const { correo, nombre, img } = await googleVerify(id_token)

    let usuario = await User.findOne({ correo })

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true
      }

      usuario = new Usuario(data)
      await usuario.save()
    }

    // Si el usuario en DB
    if (!usuario.enable) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(400).json({
      msg: 'Token de Google no es válido'
    })
  }
}

const renewToken = async (req, res = response) => {
  const { user } = req
  const token = await generarJWT(user.id)
  res.json({
    user,
    token,
    ok: true
  })
}

module.exports = {
  login,
  googleSignin,
  renewToken
}
