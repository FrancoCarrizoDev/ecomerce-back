const { response } = require('express')
const { ProducTycValTyc } = require('../models')

// TODO validar en todos endpoints duplicate keys

const getProductTycValTyc = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  const productTycValTyc = await ProducTycValTyc.find()
    .populate('product_fk', 'name')
    .populate('product_tyc_fk', 'name')
    .populate('product_val_tyc_fk', 'value')

  res.json({
    productTycValTyc
  })
}

const getProductTycValTycById = async (req, res = response) => {
  const { id } = req.params

  const productTycValTyc = await ProducTycValTyc.findById(id)
    .populate('product_fk', 'name')
    .populate('product_tyc_fk', 'name')
    .populate('product_val_tyc_fk', 'value')

  res.json({
    productTycValTyc
  })
}

const createProductTycValTyc = async (req, res = response) => {
  const { product_fk, product_tyc_fk, product_val_tyc_fk } = req.body

  const data = {
    product_fk,
    product_tyc_fk,
    product_val_tyc_fk
  }

  const productTycValTyc = new ProducTycValTyc(data)

  await productTycValTyc.save()

  res.status(201).json(productTycValTyc)
}

const updateProductTycValTyc = async (req, res = response) => {
  const { id } = req.params
  const { product_fk, product_tyc_fk, product_val_tyc_fk } = req.body

  const data = {
    product_fk,
    product_tyc_fk,
    product_val_tyc_fk
  }

  const productTycValTyc = await ProducTycValTyc.findByIdAndUpdate(id, data, {
    new: true
  })

  res.json(productTycValTyc)
}

module.exports = {
  getProductTycValTyc,
  createProductTycValTyc,
  updateProductTycValTyc,
  getProductTycValTycById
}
