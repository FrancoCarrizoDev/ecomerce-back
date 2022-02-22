const { response } = require('express')
const { ProductValueCategory } = require('../models')

// const getCategories = async (req, res = response) => {
//   const { limit = 5, skip = 0 } = req.query;
//   const query = { enabled: true };

//   const categories = await ProductCategory.find();

//   res.json({
//     categories,
//   });
// };

// const getCategory = async (req, res = response) => {
//   const { id } = req.params;
//   const category = await ProductCategory.findById(id);

//   //   const category = await ProductCategorySchema.findById(id).populate(
//   //     "usuario",
//   //     "nombre"
//   //   );

//   res.json(category);
// };

const getProductValuesCategoryByCategoryId = async (req, res = response) => {
  const { id } = req.params

  const productValuesCategoryById = await ProductValueCategory.find({
    product_category_fk: id,
    enabled: true
  })
    .select('value _id')
    .sort({ value: 1 })
  // .populate("product_category_fk");

  if (!productValuesCategoryById) {
    return res.status(400).json({
      msg: `No existe la categoría ${productValuesCategoryById}`
    })
  }

  res.status(200).json(productValuesCategoryById)
}

const createProductValueCategory = async (req, res = response) => {
  // eslint-disable-next-line camelcase
  const { value, product_category_id } = req.body

  const data = {
    value,
    product_category_fk: product_category_id
  }

  const productValueCategory = new ProductValueCategory(data)

  await productValueCategory.save()

  res.status(201).json(productValueCategory)
}

const editProductValueCategory = async (req, res = response) => {
  const { id } = req.params
  const { value } = req.body

  const productValueCategoryDB = await ProductValueCategory.findOneAndUpdate(
    { _id: id },
    { value: value },
    { new: true }
  )

  if (!productValueCategoryDB) {
    return res.status(400).json({
      msg: 'No existe ese valor de categoría'
    })
  }

  res.status(200).json(productValueCategoryDB)
}

const disableProductValueCategory = async (req, res = response) => {
  const { id } = req.params

  const productValueCategoryDB = await ProductValueCategory.findOneAndUpdate(
    { _id: id },
    { enabled: false },
    { new: true }
  )

  if (!productValueCategoryDB) {
    return res.status(400).json({
      msg: 'No existe ese valor de categoría'
    })
  }

  res.status(200).json(productValueCategoryDB)
}

module.exports = {
  createProductValueCategory,
  getProductValuesCategoryByCategoryId,
  disableProductValueCategory,
  editProductValueCategory
}
