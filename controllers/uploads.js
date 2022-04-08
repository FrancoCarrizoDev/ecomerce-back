const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require('express')
const { subirArchivo } = require('../helpers')

const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req, res = response) => {
  try {
    // txt, md
    // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
    const nombre = await subirArchivo(req.files, undefined, 'imgs')
    res.json({ nombre })
  } catch (msg) {
    res.status(400).json({ msg })
  }
}

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen)
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion)
  modelo.img = nombre

  await modelo.save()

  res.json(modelo)
}

const uploadImgCloud = async (req, res = response) => {
  if (!req.files.collection) res.json({ msg: 'No hay archivos que subir' })

  const promises = []
  const collections = []

  if (Array.isArray(req.files.collection)) {
    for (const img of req.files.collection) {
      const { tempFilePath } = img
      promises.push(
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload(tempFilePath, (err, result) => {
            if (err) reject(err)
            else resolve(collections.push(result))
          })
        })
      )
    }
  } else {
    const { tempFilePath } = req.files.collection
    promises.push(
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload(tempFilePath, (err, result) => {
          if (err) reject(err)
          else resolve(collections.push(result))
        })
      })
    )
  }

  await Promise.all(promises)

  res.json({ images: collections })
}

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break

    case 'productos':
      modelo = await Producto.findById(id)
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' })
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }
  }

  const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(pathImagen)
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  uploadImgCloud
}
