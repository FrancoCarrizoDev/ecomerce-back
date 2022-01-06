const Role = require("../models/role");
const { User, ProductCategory, Product } = require("../models");

const isValidRole = async (rol = "") => {
  const existsRole = await Role.findOne({ rol });
  if (!existsRole) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExists = async (correo = "") => {
  // Verificar si el correo existe
  const hasEmail = await User.findOne({ correo });
  if (hasEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

const existsUserById = async (id) => {
  // Verificar si el correo existe
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Categorias
 */
const existsCategoryById = async (id) => {
  // Verificar si el correo existe
  const category = await ProductCategory.findById(id);
  if (!category) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Productos
 */
const existsProductById = async (id) => {
  // Verificar si el correo existe
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
  existsCategoryById,
  existsProductById,
  coleccionesPermitidas,
};
