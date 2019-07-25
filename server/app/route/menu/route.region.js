module.exports = function(app) {
  const region = require("../../controller/menu/controller.region");

  app.get("/region/getall", region.getall);

  app.post("/region/addregion", region.addregion);

  app.post("/region/updateregion", region.updateRegion);

  app.get("/region/deleteregion/:id", region.deleteRegion);
};
