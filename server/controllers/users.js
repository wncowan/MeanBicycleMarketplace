const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
function sendData(res, data) {
    res.json({
        message: "Success",
        data: data
    });
}
function buildErrorHandler(res, callback) {
    return function(err, data) {
        if(err) {
            res.json({
                message: "Error",
                error: err
            });
        }
        else {
            callback(data);
        }
    }
}
function buildQueryHandler(res) {
    return buildErrorHandler(res, function(data) {
        sendData(res, data);
    });
}
function authLoggedIn(req, res, callback) {
    User.findById(req.session.user_id, buildErrorHandler(res, function(user) {
        if(!user) {
            res.json({message: "auth_error"});
        }
        else {
            callback(user);
        }
    }));
}
function getAllListings(res, callback) {
    let listings = [];
    User.find({}, buildErrorHandler(res, function(users) {
        for(let u of users) {
            listings = listings.concat(u.listings);
        }
        callback(listings);
    }));
}
module.exports = {
    register: function(req, res) {
        user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            listings: []
        });
        bcrypt.hash(req.body.password, 10, buildErrorHandler(res, function(hash) {
            user.password = hash;
            user.save(buildErrorHandler(res, function(data){
                req.session.user_id = user._id;
                sendData(res, data);
            }));
        }));
    },
    login: function(req, res) {
        User.findOne({email: req.body.email}, buildErrorHandler(res, function(user) {
            bcrypt.compare(req.body.password, user.password, buildErrorHandler(res, function(good){
                if(good) {
                    req.session.user_id = user._id;
                    sendData(res, user);
                }
                else {
                    res.json({
                        message: "Error",
                        error: {message: "Invalid Credentials"}
                    });
                }
            }));
        }));
    },
    logout: function(req, res) {
        req.session.user_id = null;
        sendData(res, {});
    },
    all_listings: function(req, res) {
        authLoggedIn(req, res, function(user) {
            getAllListings(res, function(listings) {
                sendData(res, listings);
            });
        });
    },
    user_listings: function(req, res) {
        authLoggedIn(req, res, function(user) {
            sendData(res, user.listings);
        });
    },
    random_listing: function(req, res) {
        getAllListings(res, function(listings) {
            if(listings.length > 0) {
                sendData(res, listings[Math.floor(Math.random() * listings.length)]);
            }
            else {
                res.json({
                    message: "Error",
                    error: {message: "No listings available"}
                });
            }
        });
    },
    create_listing: function(req, res) {
        authLoggedIn(req, res, function(user) {
            user.listings.push(req.body);
            user.save(buildQueryHandler(res));
        });
    },
    update_listing: function(req, res) {
        authLoggedIn(req, res, function(user) {
            let listing = user.listings.id(req.params.id);
            for(let field of ["title", "description", "price", "location", "img_url"]) {
                listing[field] = req.body[field];
            }
            user.markModified("listings");
            user.save(buildQueryHandler(res));
        });
    },
    delete_listing: function(req, res) {
        authLoggedIn(req, res, function(user) {
            user.listings.id(req.params.id).remove();
            user.save(buildQueryHandler(res));
        });
    },
    get_owner: function(req, res) {
        authLoggedIn(req, res, function(user) {
            User.findOne({listings: {$elemMatch: {_id: req.params.id}}}, buildQueryHandler(res));
        });
    }
}