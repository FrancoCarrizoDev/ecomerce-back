const { response } = require("express");
const { ProductCategory } = require("../models");

const getCategories = async (req, res = response) => {
  // const { limit = 5, skip = 0 } = req.query;
  // const query = { enabled: true };

  // TODO Ordenar por tipo cuando se llegue a ese momento
  const categories = await ProductCategory.find().sort({ name: 1 });

  res.json({
    categories,
  });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await ProductCategory.findById(id);

  //   const category = await ProductCategorySchema.findById(id).populate(
  //     "usuario",
  //     "nombre"
  //   );

  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await ProductCategory.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    name,
  };

  const category = new ProductCategory(data);

  // Guardar DB
  await category.save();

  res.status(201).json(category);
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await ProductCategory.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await ProductCategory.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(categoriaBorrada);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  actualizarCategoria,
  borrarCategoria,
};
