const { response } = require("express");
const { ProductCategorySchema } = require("../models");

const getCategories = async (req, res = response) => {
  const { limit = 5, skip = 0 } = req.query;
  const query = { enabled: true };

  const [whole, categories] = await Promise.all([
    ProductCategorySchema.countDocuments(query),
    ProductCategorySchema.find(query)
      .populate("usuario", "nombre")
      .skip(Number(skip))
      .limit(Number(limit)),
  ]);

  res.json({
    whole,
    categories,
  });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await ProductCategorySchema.findById(id);

  //   const category = await ProductCategorySchema.findById(id).populate(
  //     "usuario",
  //     "nombre"
  //   );

  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await ProductCategorySchema.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.user._id,
  };

  const category = new ProductCategorySchema(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(category);
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await ProductCategorySchema.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await ProductCategorySchema.findByIdAndUpdate(
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
