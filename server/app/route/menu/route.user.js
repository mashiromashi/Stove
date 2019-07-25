module.exports = function(app) {
  const user = require("../../controller/menu/controller.user");

  app.get("/user/getall", user.getAll);

  app.post("/user/createuser", user.createUser);

  app.post("/user/updateuser", user.updateUser);

  app.get("/user/deleteuser/:id", user.deleteUser);
  
  //for user login api//
  app.post('/users/login',user.login);
};
