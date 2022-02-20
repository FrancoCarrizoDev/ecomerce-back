const { Schema, model } = require('mongoose')

const ProductTypeSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  product_sub_type_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_sub_type',
    required: false
  }
})

ProductTypeSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Product_type', ProductTypeSchema)
