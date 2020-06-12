const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
  product_id:{
    type:Number,
    require:true
    },
  purchase_quantity:{
    type:Number,
    require:true
  },
  purchase_date:{
    type:Date,
    require:true
  },
});

module.exports = PurchaseSchema;