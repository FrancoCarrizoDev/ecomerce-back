const { Schema, model } = require('mongoose')

const ProductSubTypeSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  product_category_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_categorie',
    required: false
  }
})

ProductSubTypeSchema.methods.toJSON = function () {
  const { __v, enabled, ...data } = this.toObject()
  return data
}

module.exports = model('Product_sub_type', ProductSubTypeSchema)
