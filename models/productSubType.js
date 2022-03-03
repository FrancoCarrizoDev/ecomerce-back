const { Schema, model } = require('mongoose')

const ProductSubTypeSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  enabled: {
    type: Boolean,
    default: true
  },
  product_type_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_type',
    required: [true, 'Debe pertenecer a algún tipo']
  }
})

ProductSubTypeSchema.methods.toJSON = function () {
  const { __v, enabled, ...data } = this.toObject()
  return data
}

module.exports = model('Product_sub_type', ProductSubTypeSchema)
