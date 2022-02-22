const { response } = require('express')
const { ProductTypeCategory } = require('../models')

const getProductTypeCategories = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  // TODO Ordenar por tipo cuando se llegue a ese momento
  const productTypeCategories = await ProductTypeCategory.find({ enabled: true }).sort({
    name: 1
  })

  res.json({
    productTypeCategories
  })
}

const getTypeCategory = async (req, res = response) => {
  const { id } = req.params
  const typeCategory = await ProductTypeCategory.findById(id)

  if (!typeCategory) {
    return res.status(400).json({
      msg: 'La categoria no existe'
    })
  }

  res.json(typeCategory)
}

const createTypeCategory = async (req, res = response) => {
  const { name } = req.body

  const data = {
    name
  }

  const tpyeCategory = new ProductTypeCategory(data)

  await tpyeCategory.save()

  res.status(201).json(tpyeCategory)
}

const updateProductTypeCategory = async (req, res = response) => {
  const { id } = req.params
  const { name } = req.body

  const data = {
    name: name.toUpperCase()
  }

  const typeCategory = await ProductTypeCategory.findByIdAndUpdate(id, data, {
    new: true
  })

  res.json(typeCategory)
}

const deleteProductTypeCategory = async (req, res = response) => {
  const { id } = req.params
  const removeCategory = await ProductTypeCategory.findByIdAndUpdate(
    id,
    { enabled: false },
    { new: true }
  )

  if (!removeCategory) {
    return res.status(400).json({
      msg: 'No se pudo eliminar la categoría'
    })
  }

  res.json(removeCategory)
}

module.exports = {
  createTypeCategory,
  getProductTypeCategories,
  getTypeCategory,
  updateProductTypeCategory,
  deleteProductTypeCategory
}
