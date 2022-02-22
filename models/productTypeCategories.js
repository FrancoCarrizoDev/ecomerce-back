const { Schema, model } = require('mongoose')

const ProductTypeCategory = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: false
  },
  enabled: {
    type: Boolean,
    default: true
  },
  product_type_fk: {
    type: Schema.Types.ObjectId,
    ref: 'product_type'
  }
})

ProductTypeCategory.methods.toJSON = function () {
  const { __v, enabled, ...data } = this.toObject()
  return data
}

module.exports = model('Product_type_categorie', ProductTypeCategory)
