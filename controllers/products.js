const { response } = require('express')
const { Product } = require('../models')

const getProducts = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query
  // const query = { enable: true }

  const product = await Product.find().select('product_type_values_categories')

  // const [whole, products] = await Promise.all([
  //   Product.countDocuments(query),
  //   Product.find(query).skip(Number(skip)).limit(Number(limit))
  // ])

  res.json({
    product
  })
}

const getProduct = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)

  res.json(product)
}

const createProduct = async (req, res = response) => {
  // TODO ojo acá hay que validar si todos las foreign keys son válidas
  // eslint-disable-next-line camelcase
  const { name, product_type_values_categories, product_values_categories, ...body } = req.body

  const productDB = await Product.findOne({ name })

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, already exists`
    })
  }

  // Generar la data a guardar
  const data = {
    price: body.price,
    quantity: body.quantity,
    name: name.toUpperCase(),
    product_type_fk: body.product_type_fk,
    product_sub_type_fk: body.product_sub_type_fk
  }

  const product = new Product(data)

  product_type_values_categories.forEach((tyValCat) =>
    product.product_type_values_categories.push(tyValCat)
  )

  product_values_categories.forEach((valCat) => product.product_values_categories.push(valCat))

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
  const productoBorrado = await Product.findByIdAndUpdate(id, { estado: false }, { new: true })

  res.json(productoBorrado)
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
