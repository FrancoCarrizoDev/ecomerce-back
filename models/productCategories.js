const { Schema, model } = require("mongoose");

const ProductCategorySchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
});

ProductCategorySchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Product_categorie", ProductCategorySchema);
