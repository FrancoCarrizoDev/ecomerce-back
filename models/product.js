const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  product_type_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_type',
    required: false
  },
  product_sub_type_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_sub_type',
    required: false
  },
  product_tyc_val_ty_fk: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product_tyc_val_tyc'
    }
  ],
  product_cat_val_cat_fk: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product_cat_val_cat'
    }
  ],
  enable: {
    type: Boolean,
    required: true,
    default: true
  },
  img: { type: String, required: false }
})

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Product', ProductSchema)
