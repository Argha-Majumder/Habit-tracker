const User = require('../models/user');

module.exports.profile = function(req, res) {
    User.findById(req.params.id).then((user)=>{
        return res.render('user_profile', {
            title: "User: profile",
            profile_user: user
        })
    }).catch((err)=>console.log(err));
}

// render the sign up page
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Habit Tracker | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render("user_sign_in", {
        title: "Habit Tracker | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error',"Password mismatched!");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}).then((user)=>{
        if (!user) {
            User.create(req.body).catch(err=>console.log("Error in creating user in signing up"));
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    }).catch(err=>console.log("Error in finding user in signing up"));
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success',"Logged in successfully");
    return res.redirect('/');
}

// Signing out using passport.js 
module.exports.destroySession = function(req, res) {
    req.logout((err)=>{
        if (err) {
            return done(err);
        }
    });
    req.flash('success',"You have logged out!");
    return res.redirect('/');
}