const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stove_sale = db.stove_sale;
const stove_declaration_form = db.stove_declaration_form;
const { imagePath } = require("../../config/url");
var base64Img = require("base64-img");

exports.getAll = (req, res) => {
  let syx = `select
    s.existing_stove_technology,
    s.existing_cooking_fuel,
    s.model_name,
    s.serial_number,
    s.distribution_date,
    s.retailer_name,
    s.retailer_mom_name,
    s.beneficiary_name,
    s.beneficiary_mom_name,
    s.createdAt,
    s.id,
    s.mobile_number,
    d.distributorname,
    r.name as regionname,
    t.name as townshipname,
    v.villagename
  from
    stove_sale as s
    inner join stove_distributor as d on d.id = s.distributor_id
    inner join stove_region as r on r.id = s.region_id
    inner join stove_township as t on t.id = s.township_id
    inner join stove_village as v on v.id = s.village_id`;
  sequelize
    .query(syx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      res.send(result);
    });
};

//create sales

exports.createStoveSales = (req, res) => {
  let data = req.body;
  let signature = `data:image/png;base64,${data.signature}`;
  var signatureImgname = new Date().getTime();
  base64Img.img(signature, `${imagePath}signature`, signatureImgname, function(
    err,
    filepath
  ) {
    console.log("file path is", filepath);
  });
  let file = req.files.files;
  let beneficiarydetail = JSON.parse(data.beneficiarydetail);
  let existingcooking = JSON.parse(data.existingcooking);
  let ICSdetail = JSON.parse(data.ICSdetail);
  console.log(ICSdetail);
  let retailerdetail = JSON.parse(data.retailerdetail);
  stove_sale
    .create({
      beneficiary_name: beneficiarydetail.name,
      beneficiary_mom_name: beneficiarydetail.mom_name,
      village_id: beneficiarydetail.village_id,
      township_id: beneficiarydetail.township_id,
      region_id: beneficiarydetail.region_id,
      mobile_number: beneficiarydetail.mobile_number,
      existing_stove_technology: existingcooking.existing_technology,
      existing_cooking_fuel: existingcooking.existing_fuel,
      model_name: ICSdetail.model_name,
      serial_number: ICSdetail.serial_number,
      distribution_date: ICSdetail.date,
      retailer_name: retailerdetail.name,
      retailer_mom_name: retailerdetail.mom_name,
      distributor_id: retailerdetail.distributor_id,
      signature_name: signatureImgname + ".png"
    })
    .then(createresult => {
      if (createresult) {
        let sale_id = createresult.dataValues.id;
        file.map(item => {
          stove_declaration_form.create({
            sale_id: sale_id,
            img: item.originalname
          });
        });

        res.status(200).json({
          message: "Successful"
        });
      } else {
        res.status(200).json({
          message: "Fail"
        });
      }
    });
};

exports.getSalesByDistributor = (req, res) => {
  let saleID = req.params.id;
  let sql = ` select
    s.existing_stove_technology,
    s.existing_cooking_fuel,
    s.model_name,
    s.serial_number,
    s.distribution_date,
    s.retailer_name,
    s.retailer_mom_name,
    s.beneficiary_name,
    s.beneficiary_mom_name,
    s.createdAt,
    s.id,
    s.mobile_number,
    d.distributorname,
    r.name as regionname,
    t.name as townshipname,
    v.villagename
  from
    stove_sale as s
    inner join stove_distributor as d on d.id = s.distributor_id
    inner join stove_region as r on r.id = s.region_id
    inner join stove_township as t on t.id = s.township_id
    inner join stove_village as v on v.id = s.village_id
  where
    ${saleID} = d.id and s.distributor_id = ${saleID}`;
  sequelize
    .query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      res.send(result);
    });
};
