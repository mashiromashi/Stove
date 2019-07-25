module.exports = function(app) {
  const stoveType = require("../../controller/menu/controller.stoveType");

  app.get("/stoveType/getall", stoveType.getAll);
  app.get('/stoveType/mobilegetAll',stoveType.mobilegetAll);

  app.post("/stoveType/create_stovetype", stoveType.createStoveType);

  app.post("/stoveType/update_Stovetype", stoveType.updateStoveType);

  app.get("/stoveType/delete_Stovetype/:id", stoveType.deleteStoveType);
};
