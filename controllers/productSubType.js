const { response } = require('express')
const { ProductSubType } = require('../models')

const getProductSubTypes = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  // TODO Ordenar por tipo cuando se llegue a ese momento
  const productSubTypes = await ProductSubType.find({ enabled: true }).sort({
    name: 1
  })

  res.json({
    productSubTypes
  })
}

// const getProductSubTypeById = async (req, res = response) => {
//   const { id } = req.params
//   const productSubType = await ProductSubType.findById(id).populate('product_type_fk')

//   if (!productSubType) {
//     return res.status(400).json({
//       msg: 'El sub tipo de producto no existe'
//     })
//   }

//   res.json(productSubType)
// }

const getProductsSubTypesByTypeId = async (req, res = response) => {
  const { productTypeFk } = req.params
  const productSubType = await ProductSubType.find({
    product_type_fk: productTypeFk,
    enabled: true
  }).populate('product_type_fk', 'name id')

  if (productSubType.length === 0) {
    return res.status(400).json({
      msg: 'El sub tipo de producto no existe'
    })
  }

  res.json(productSubType)
}

const createProductSubType = async (req, res = response) => {
  const { name } = req.body

  const data = {
    name,
    product_type_fk: req.body.product_type_fk ? req.body.product_type_fk : null
  }

  const productSubType = new ProductSubType(data)

  await productSubType.save()

  res.status(201).json(productSubType)
}

const updateProductSubType = async (req, res = response) => {
  const { id } = req.params
  const { name } = req.body

  const data = {
    name: name.toUpperCase()
  }

  const productSubType = await ProductSubType.findByIdAndUpdate(id, data, {
    new: true
  })

  res.json(productSubType)
}

const deleteProductSubType = async (req, res = response) => {
  const { id } = req.params
  const productSubType = await ProductSubType.findByIdAndUpdate(
    id,
    { enabled: false },
    { new: true }
  )

  if (!productSubType) {
    return res.status(400).json({
      msg: 'No se pudo el sub tipo'
    })
  }

  res.json(productSubType)
}

module.exports = {
  getProductSubTypes,
  createProductSubType,
  updateProductSubType,
  deleteProductSubType,
  getProductsSubTypesByTypeId
}
