module.exports = function(app) {
  const sale = require("../../controller/menu/controller.sale");
  const multer = require("multer");
  const { imagePath } = require("../../config/url");
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const mimeType = file.mimetype;
      if (mimeType.startsWith("image/")) {
        cb(null, imagePath + "contracts/");
      } else {
        cb(null, false);
      }
    },
    filename: function(req, file, cb) {
      let filetype = file.mimetype.split("/")[1];
      cb(null, new Date().getTime() + "." + filetype);
    }
  });
  const fileFilter = (req, file, cb) => {
    const mimeType = file.mimetype;
    if (mimeType.startsWith("image/")) {
      cb(null, true);
    } else {
      console.log("error");
      return cb(new Error("Wrong file type"), false);
    }
  };
  var upload = multer({
    storage: storage,
    limits: {
      fieldSize: 25 * 1024 * 1024
    },
    fileFilter: fileFilter
  });
  var postUpload = upload.fields([{ name: "files", maxCount: 8 }]);

  app.get("/sale/getall", sale.getAll);
  app.post("/sale/createsale", postUpload, sale.createStoveSales);
  app.get("/sale/getsalebydistributor/:id", sale.getSalesByDistributor);
};
