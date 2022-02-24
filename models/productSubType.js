const { Schema, model } = require('mongoose')

const ProductSubTypeSchema = Schema({
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

ProductSubTypeSchema.methods.toJSON = function () {
  const { __v, enabled, ...data } = this.toObject()
  return data
}

module.exports = model('Product_sub_type', ProductSubTypeSchema)
