const { Schema, model } = require('mongoose')

const ProductCategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: false
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

ProductCategorySchema.methods.toJSON = function () {
  const { __v, enabled, ...data } = this.toObject()
  return data
}

module.exports = model('Product_categorie', ProductCategorySchema)
