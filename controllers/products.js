const { response } = require('express')
const { Product } = require('../models')

const getProducts = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query
  const query = { enable: true }

  const [whole, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).skip(Number(skip)).limit(Number(limit))
  ])

  res.json({
    whole,
    products
  })
}

const getProduct = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)

  res.json(product)
}

const createProduct = async (req, res = response) => {
  const { name, ...body } = req.body

  const productDB = await Product.findOne({ name })

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, already exists`
    })
  }

  // Generar la data a guardar
  const data = {
    ...body,
    name: name.toUpperCase()
  }

  const product = new Product(data)

  // Guardar DB
  await product.save()

  res.status(201).json(product)
}

const updateProduct = async (req, res = response) => {
  const { id } = req.params
  const { estado, usuario, ...data } = req.body

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase()
  }

  data.usuario = req.usuario._id

  const producto = await Product.findByIdAndUpdate(id, data, { new: true })

  res.json(producto)
}

const deleteProduct = async (req, res = response) => {
  const { id } = req.params
  const productoBorrado = await Product.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  )

  res.json(productoBorrado)
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
