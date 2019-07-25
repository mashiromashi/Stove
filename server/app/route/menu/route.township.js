module.exports = function(app) {
    const township = require("../../controller/menu/controller.township");

    app.get("/township/getall", township.getAll);
    app.get('/township/getbyid/:id', township.getbyid);
    app.post("/township/createTownship", township.createTownship);

    app.post("/township/updateTownship", township.updateTownship);

    app.get("/township/deleteTownship/:id", township.deleteTownship);
};