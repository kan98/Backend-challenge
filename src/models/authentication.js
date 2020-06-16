var User = require('./schemas/users');

var signup = async function(req) {
    if (req.body.name == null
            || req.body.email == null
            || req.body.password == null) {
        return -1;
    }

    await User.findOne({ email: req.body.email })
    .then(profile => {
      if (profile) {
        email_exists = true;
      } else {
          email_exists = false;
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });

    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        member_type: "standard"
    });

    if (!email_exists) {
        return await newUser
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

var login = async function(req) {
    if (req.body.email == null || req.body.password == null) {
        return -1;
    }

    var loginAttempt = {};
    loginAttempt.email = req.body.email;
    loginAttempt.password = req.body.password;
  
    return await User.findOne({ email: loginAttempt.email })
      .then(profile => {
        if (!profile || profile.password != loginAttempt.password) {
          return false;
        } else {
            return true;
        }
      })
      .catch(err => {
        console.log("Error is ", err.message);
        return false;
      });
}

module.exports = {
    signup: signup,
    login: login
};