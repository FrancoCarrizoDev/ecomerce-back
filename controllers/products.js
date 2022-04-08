const { response } = require('express')
const { Product } = require('../models')

const GENERE_MASCULINE = '6248b3e064fb140df3c26fb5'

const getProducts = async (req, res = response) => {
  const { limit = 12, skip = 0 } = req.query
  /*
      {'children.age': {$gte: 18}},
    {children:{$elemMatch:{age: {$gte: 18}}}})
  */

  const [whole, products] = await Promise.all([
    Product.countDocuments(),
    Product.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .populate('product_type_fk', 'name')
      .populate('product_sub_type_fk', 'name')
      .populate({
        path: 'product_tyc_val_tyc_fk',
        populate: {
          path: 'product_tyc_fk',
          populate: {
            path: 'product_type_categories'
          }
        }
      })
      .populate({
        path: 'product_tyc_val_tyc_fk',
        populate: {
          path: 'product_val_tyc_fk',
          populate: {
            path: 'product_type_value_categories'
          }
        }
      })
      .populate({
        path: 'product_cat_val_cat_fk',
        populate: {
          path: 'product_cat_fk',
          populate: {
            path: 'product_categories'
          }
        }
      })
      .populate({
        path: 'product_cat_val_cat_fk',
        populate: {
          path: 'product_val_cat_fk',
          populate: {
            path: 'product_value_categories'
          }
        }
      })
  ])

  res.json({
    products,
    whole
  })
}

const getProductById = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('product_type_fk', 'name')
    .populate('product_sub_type_fk', 'name')
    .populate({
      path: 'product_tyc_val_tyc_fk',
      populate: {
        path: 'product_tyc_fk',
        populate: {
          path: 'product_type_categories'
        }
      }
    })
    .populate({
      path: 'product_tyc_val_tyc_fk',
      populate: {
        path: 'product_val_tyc_fk',
        populate: {
          path: 'product_type_value_categories'
        }
      }
    })
    .populate({
      path: 'product_cat_val_cat_fk',
      populate: {
        path: 'product_cat_fk',
        populate: {
          path: 'product_categories'
        }
      }
    })
    .populate({
      path: 'product_cat_val_cat_fk',
      populate: {
        path: 'product_val_cat_fk',
        populate: {
          path: 'product_value_categories'
        }
      }
    })

  res.json(product)
}

const createProduct = async (req, res = response) => {
  // TODO ojo acá hay que validar si todos las foreign keys son válidas

  const { name, ...body } = req.body

  const productDB = await Product.findOne({ name })

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, already exists`
    })
  }

  // Generar la data a guardar
  const data = {
    name: name.toUpperCase(),
    price: body.price,
    quantity: body.quantity,
    product_type_fk: body.product_type_fk,
    product_sub_type_fk: body.product_sub_type_fk,
    description: body.description,
    img: [...body.img],
    code: body.code
  }

  const product = new Product(data)

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
// TODO esta mal el nombre, va a ser updateCategories en general
const updateTycValTyc = async (req, res = response) => {
  const { id } = req.params
  const { tycValTycs, catValCats } = req.body

  const producto = await Product.findById(id)

  if (!producto) {
    return res.status(400).json({
      msg: 'El producto no existe'
    })
  }
  // TODO arreglar el envio de este array
  producto.product_tyc_val_tyc_fk.push(...tycValTycs.productTycValTyc)
  producto.product_cat_val_cat_fk.push(...catValCats.productCatValCat)

  await producto.save()

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
  getProductById,
  updateProduct,
  updateTycValTyc,
  deleteProduct
}
