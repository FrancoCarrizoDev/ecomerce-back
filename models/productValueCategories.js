const { Schema, model } = require("mongoose");

const ProductValueCategory = Schema({
  value: {
    type: String,
    required: [true, "El value es obligatorio"],
    unique: true,
  },
  product_category_fk: {
    type: Schema.Types.ObjectId,
    ref: "Product_categorie",
    required: false,
  },
});

ProductValueCategory.methods.toJSON = function () {
  const { __v, enabled, ...data } = this.toObject();
  return data;
};

module.exports = model("Product_value_categorie", ProductValueCategory);
