const mongoose = require('mongoose');
var Purchases = require('./purchases');

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
  type:String,
  require:true
  },
  password:{
    type:String,
    require:true
  },
  member_type:{
    type:String,
    require:false
  }
});

module.exports = Users = mongoose.model('UserSchema',UserSchema);