const { response } = require("express");
const { ProductValueCategory } = require("../models");

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

const createValueCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const values = req.body.values;

  const categoryDB = await ProductValueCategory.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
  };

  const category = new ProductValueCategory(data);

  // Guardar DB
  await category.save();

  res.status(201).json(category);
};

module.exports = {
  createValueCategory,
};
