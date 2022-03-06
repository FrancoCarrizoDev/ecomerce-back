const { Schema, model } = require('mongoose')

const ProductCatValCatSchema = Schema({
  product_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  product_cat_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_categorie',
    unique: true
  },
  product_val_cat_fk: {
    type: Schema.Types.ObjectId,
    ref: 'Product_value_categorie'
  }
})

ProductCatValCatSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Product_cat_val_cat', ProductCatValCatSchema)
