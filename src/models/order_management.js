var User = require('./schemas/users');
var Product = require('./schemas/products');
var Purchases = require('./schemas/purchases');

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var create_order = async function(req) {
    if (req.body.product_id == null || req.body.purchase_quantity == null) {
      return -1;
    }
    
    await Product.findOne({ product_id: req.body.product_id })
    .then(product => {
        if (product) {
            product_exists = true;
        } else {
            product_exists = false;
        }
    })
    .catch(err => {
        console.log("Error is ", err.message);
    });

    var newPurchase = new Purchases({
        purchase_id: mongoose.Types.ObjectId(),
        product_id: req.body.product_id,
        purchased_by: req.body.email,
        product_type: req.body.product_type,
        purchase_quantity: req.body.purchase_quantity,
        purchase_date: new Date()
      });
    
      if (product_exists) {
        return await newPurchase
          .save()
          .then(() => {
              return true;
          })
          .catch(err => {
              console.log("Error is ", err.message);
              return false;
          });
      } else {
          return false;
      }
}

var delete_order = async function(req) {
    if (req.body.purchase_id == null) {
      return -1;
    }
    return await Purchases.findOneAndRemove({ purchase_id: req.body.purchase_id })
    .then(() => {
        return true;
    })
    .catch(err => {
        console.log("Error is ", err.message);
    });
}

var get_order = async function(req) {
    if (req.body.purchase_id == null) {
      return -1;
    }
    return await Purchases.findOne({ purchase_id: req.body.purchase_id })
    .then(purchase => {
        if (!purchase || purchase.purchased_by !== req.body.email) {
            return false;
        } else {
            object = new Object()
            object.purchase_id = purchase.purchase_id;
            object.purchased_by = purchase.purchased_by;
            object.product_id = purchase.product_id;
            object.purchase_quantity = purchase.purchase_quantity;
            object.purchase_date = purchase.purchase_date;
            return object;
        }
    })
    .catch(err => {
        console.log("Error is ", err.message);
        return false;
    });
}

module.exports = {
    create_order: create_order,
    delete_order: delete_order,
    get_order: get_order
};