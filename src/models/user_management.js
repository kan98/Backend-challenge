var User = require('./schemas/users');
var Product = require('./schemas/products');
var Purchases = require('./schemas/purchases');

var get_profile = async function(req) {
    return await User.findOne({ email: req.body.email })
        .then(profile => {
           response = new Object()
           response.name = profile.name;
           response.email = profile.email; 
           response.member_type = profile.member_type;
           return response;
    })
}

var purchase_history = async function(req) {
    return await Purchases.find({ purchased_by: req.body.email })
        .then(purchases => {
            response = [];
            purchases.forEach(function(purchase) {

               object = new Object()
               object.purchase_id = purchase.purchase_id;
               object.purchased_by = purchase.purchased_by;
               object.product_id = purchase.product_id;
               object.purchase_quantity = purchase.purchase_quantity;
               object.purchase_date = purchase.purchase_date;
               response.push(object);
            })
            return response;
    })
}

module.exports = {
    get_profile: get_profile,
    purchase_history: purchase_history
};
