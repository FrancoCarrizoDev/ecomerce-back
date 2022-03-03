const { Schema, model } = require('mongoose')

const ProductTypeSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

ProductTypeSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Product_type', ProductTypeSchema)
