const { response } = require("express");
const { ProductCategory } = require("../models");

const getCategories = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  // TODO Ordenar por tipo cuando se llegue a ese momento
  const categories = await ProductCategory.find({ enabled: true }).sort({
    name: 1,
  });

  res.json({
    categories,
  });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await ProductCategory.findById(id);

  if (!category) {
    return res.status(400).json({
      msg: `La categoria no existe`,
    });
  }

  res.json(category);
};

const createCategory = async (req, res = response) => {
  const { name } = req.body;

  const data = {
    name,
  };

  const category = new ProductCategory(data);

  await category.save();

  res.status(201).json(category);
};

const updateProductCategory = async (req, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = {
    name: name.toUpperCase(),
  };

  const categoria = await ProductCategory.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(categoria);
};

const deleteProductCategory = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await ProductCategory.findByIdAndUpdate(
    id,
    { enabled: false },
    { new: true }
  );

  if (!categoriaBorrada) {
    return res.status(400).json({
      msg: `No se pudo eliminar la categoría`,
    });
  }

  res.json(categoriaBorrada);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateProductCategory,
  deleteProductCategory,
};
