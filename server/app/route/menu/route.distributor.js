module.exports = function (app) {
  const distributor = require("../../controller/menu/controller.distributor");

  //get
  app.get("/distributor/getall", distributor.getAll);

  //create
  app.post("/distributor/adddistributor", distributor.createDistributor);

  //update
  app.post("/distributor/updatedistributor", distributor.updatedistributor);

  //delete
  app.get("/distributor/deletedistributor/:id", distributor.deleteDistributor);
  app.post('/distributor/login', distributor.login);

  app.get("/distributor/activatedistributor/:id", distributor.activateDistributor)
};