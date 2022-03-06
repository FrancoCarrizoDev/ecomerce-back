const { Schema, model } = require('mongoose')

const ProducTycValTycSchema = Schema({
  product_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  product_tyc_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_type_categorie',
    unique: true
  },
  product_val_tyc_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_type_value_categorie'
  }
})

ProducTycValTycSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Product_tyc_val_tyc', ProducTycValTycSchema)
