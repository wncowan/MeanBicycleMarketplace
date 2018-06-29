const users = require("../controllers/users");
module.exports = function(app) {
    app.post("/api/register", users.register);
    app.post("/api/login", users.login);
    app.get("/api/logout", users.logout);
    app.get("/api/listings", users.all_listings);
    app.get("/api/listings/user", users.user_listings);
    app.get("/api/listings/random", users.random_listing);
    app.post("/api/listings", users.create_listing);
    app.patch("/api/listings/:id", users.update_listing);
    app.delete("/api/listings/:id", users.delete_listing);
    app.get("/api/listings/:id", users.get_owner);
}