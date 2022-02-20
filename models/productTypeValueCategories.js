const { Schema, model } = require("mongoose");

const ProductTypeValueCategory = Schema({
  value: {
    type: String,
    required: [true, "El value es obligatorio"],
    unique: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  product_type_category_fk: {
    type: Schema.Types.ObjectId,
    ref: "Product_type_categorie",
    required: true,
  },
});

ProductTypeValueCategory.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model(
  "Product_type_value_categorie",
  ProductTypeValueCategory
);
