const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
// application/x-www-form-urlencode parser
app.use(
    bodyparser.urlencoded({
        extended: true
    })
);

//application/json parser
app.use(bodyparser.json());
app.use(cors());

const db = require("./app/config/config.db");

db.sequelize
    .sync({
        force: false //if true all data will be truncated
    })
    .then(() => {
        console.log("server is starting");
    });

require("./app/route/menu/route.distributor")(app);
require("./app/route/menu/route.region")(app);
require("./app/route/menu/route.user")(app);
require("./app/route/menu/route.village")(app);
require("./app/route/menu/route.sale")(app);
require("./app/route/menu/route.stoveType")(app);
require('./app/route/menu/route.township')(app);

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app is listening", host, port);
});