const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
app.use(bodyParser.json());
app.use(session({
    secret: "swordfish",
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(__dirname + "/bicycleAngular/dist/bicycleAngular"));
require("./server/config/mongoose");
require("./server/config/routes")(app);
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/bicycleAngular/dist/bicycleAngular/index.html");
});
app.listen(8000);