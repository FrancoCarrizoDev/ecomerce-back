const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product_type_fk: {
    type: Schema.Types.ObjectId,
    ref: "Product_type",
    required: false,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  enable: {
    type: Boolean,
    required: true,
    default: true,
  },
  img: { type: String },
});

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductSchema);
