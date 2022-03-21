const { response } = require('express')
const { ProductCatValCat } = require('../models')

// TODO validar en todos endpoints duplicate keys

const getProductCatValCat = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  const productCatValCat = await ProductCatValCat.find()
    .populate('product_fk', 'name')
    .populate('product_cat_fk', 'name')
    .populate('product_val_cat_fk', 'value')

  res.json({
    productCatValCat
  })
}

const getProductCatValCatById = async (req, res = response) => {
  const { id } = req.params

  const productCatValCat = await ProductCatValCat.find({ product_fk: id })
    .populate('product_fk', 'name')
    .populate('product_cat_fk', 'name')
    .populate('product_val_cat_fk', 'value')

  res.json({
    productCatValCat
  })
}

const createProductCatValCat = async (req, res = response) => {
  const { product_fk, product_cat_fk, product_val_cat_fk } = req.body

  const data = {
    product_fk,
    product_cat_fk,
    product_val_cat_fk
  }

  const productCatValCat = new ProductCatValCat(data)

  await productCatValCat.save()

  res.status(201).json(productCatValCat)
}

const updateProductCatValCat = async (req, res = response) => {
  const { id } = req.params
  const { product_fk, product_cat_fk, product_val_cat } = req.body

  const data = {
    product_fk,
    product_cat_fk,
    product_val_cat
  }

  const productTycValTyc = await ProductCatValCat.findByIdAndUpdate(id, data, {
    new: true
  })

  res.json(productTycValTyc)
}

// TODO falta el delete

module.exports = {
  getProductCatValCat,
  getProductCatValCatById,
  createProductCatValCat,
  updateProductCatValCat
}
