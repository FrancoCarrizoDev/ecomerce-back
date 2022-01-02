const { Schema, model } = require("mongoose");

const ProductCategorySchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

ProductCategorySchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Product_categorie", ProductCategorySchema);
