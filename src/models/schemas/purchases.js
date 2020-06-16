const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
  purchase_id:{
    type: mongoose.Schema.Types.ObjectId,
    require:true
  },
  purchased_by:{
    type: String,
    require: true,
  },
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

module.exports = Purchases = mongoose.model('PurchaseSchema',PurchaseSchema);