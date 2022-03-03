const { response } = require('express')
const { ProductType } = require('../models')

// TODO validar en todos endpoints duplicate keys

const getProductTypes = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  // TODO Ordenar por tipo cuando se llegue a ese momento
  const productTypes = await ProductType.find({ enabled: true }).sort({
    name: 1
  })

  res.json({
    productTypes
  })
}

const createProductType = async (req, res = response) => {
  const { name } = req.body

  const data = {
    name
  }

  const productSubType = new ProductType(data)

  await productSubType.save()

  res.status(201).json(productSubType)
}

const getProductTypeById = async (req, res = response) => {
  const { id } = req.params
  const productType = await ProductType.findById(id)

  if (!productType) {
    return res.status(400).json({
      msg: 'El tipo de producto no existe'
    })
  }

  res.json(productType)
}

const updateProductType = async (req, res = response) => {
  const { id } = req.params
  const { name } = req.body

  const data = {
    name: name.toUpperCase()
  }

  const productType = await ProductType.findByIdAndUpdate(id, data, {
    new: true
  })

  res.json(productType)
}

const deleteProductType = async (req, res = response) => {
  const { id } = req.params
  const productType = await ProductType.findByIdAndUpdate(id, { enabled: false }, { new: true })

  if (!productType) {
    return res.status(400).json({
      msg: 'No se pudo el sub tipo'
    })
  }

  res.json(productType)
}

module.exports = {
  getProductTypes,
  createProductType,
  getProductTypeById,
  updateProductType,
  deleteProductType
}
