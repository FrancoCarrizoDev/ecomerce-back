const { response } = require('express')
const { ProductTypeValueCategory } = require('../models')

const getProductTypeValuesCategoryByCategoryId = async (req, res = response) => {
  const { id } = req.params

  const productTypeValuesCategoryById = await ProductTypeValueCategory.find({
    product_type_category_fk: id,
    enabled: true
  })
    .select('value _id')
    .sort({ value: 1 })
  // .populate("product_category_fk");

  if (!productTypeValuesCategoryById) {
    return res.status(400).json({
      msg: `No existe la categoría ${productTypeValuesCategoryById}`
    })
  }

  res.status(200).json(productTypeValuesCategoryById)
}

const createProductTypeValueCategory = async (req, res = response) => {
  // eslint-disable-next-line camelcase
  const { value, product_type_category_id } = req.body

  const data = {
    value,
    product_type_category_fk: product_type_category_id
  }

  const productTypeValueCategory = new ProductTypeValueCategory(data)

  await productTypeValueCategory.save()

  res.status(201).json(productTypeValueCategory)
}

const editProductTypeValueCategory = async (req, res = response) => {
  const { id } = req.params
  const { value } = req.body

  const productTypeValueCategoryDB = await ProductTypeValueCategory.findOneAndUpdate(
    { _id: id },
    { value: value },
    { new: true }
  )

  if (!productTypeValueCategoryDB) {
    return res.status(400).json({
      msg: 'No existe ese valor de categoría'
    })
  }

  res.status(200).json(productTypeValueCategoryDB)
}

const disableProductTypeValueCategory = async (req, res = response) => {
  const { id } = req.params

  const productTypeValueCategoryDB = await ProductTypeValueCategory.findOneAndUpdate(
    { _id: id },
    { enabled: false },
    { new: true }
  )

  if (!productTypeValueCategoryDB) {
    return res.status(400).json({
      msg: 'No existe ese valor de categoría'
    })
  }

  res.status(200).json(productTypeValueCategoryDB)
}

module.exports = {
  createProductTypeValueCategory,
  getProductTypeValuesCategoryByCategoryId,
  disableProductTypeValueCategory,
  editProductTypeValueCategory
}
