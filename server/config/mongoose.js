const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bicycle_marketplace");
require("../models/user");