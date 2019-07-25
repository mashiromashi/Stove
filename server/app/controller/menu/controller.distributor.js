const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stove_distributor = db.stove_distributor;

exports.getAll = (req, res) => {
  const sqlSyx = `
    select
    d.id,
    d.distributorname,
    d.regionid,
    d.password,
    d.address,
    d.phone,
    d.distributorid,
    d.status,
    r.name as regionname
  from
    stove_distributor as d
    inner join stove_region as r on r.id = d.regionid
  `;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(data => {
      res.send(data);
    });
};

exports.createDistributor = (req, res) => {
  const data = req.body;
  stove_distributor
    .findAll({
      where: {
        password: data.password,
        distributorname: data.distributorname,
        phone: data.phone
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Fail"
        });
      } else {
        stove_distributor
          .create({
            password: data.password,
            status: "Active",
            address: data.address,
            phone: data.phone,
            distributorname: data.distributorname,
            regionid: data.region.value,
            distributorid: data.distributorid,
            createdby: data.createdby,
            modifiedby: 0
          })
          .then(createresult => {
            if (createresult) {
              res.status(200).json({
                message: "Successful"
              });
            }
          });
      }
    });
};

exports.updatedistributor = (req, res) => {
  let data = req.body;
  let sqlSyx = `
     select *
     from stove_distributor
     where password='${data.password}'
     and id!=${data.id}
     and phone=${data.phone}`;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      if (result.length === 0) {
        stove_distributor
          .update(
            {
              password: data.password,
              status: "Active",
              address: data.address,
              phone: data.phone,
              distributorname: data.distributorname,
              regionid: data.region.value,
              distributorid: data.distributorid,
              modifiedby: data.modifiedby
            },
            {
              where: {
                id: data.id
              }
            }
          )
          .then(updateresult => {
            if (updateresult[0] > 0) {
              res.status(200).json({
                message: "Successful"
              });
            }
          });
      } else {
        res.status(200).json({
          message: "Fail"
        });
      }
    });
};
exports.login = (req, res) => {
  let data = req.body;
  console.log(data);
  stove_distributor
    .findAll({
      where: {
        distributorname: data.username,
        password: data.password
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Successful",
          data: result
        });
      } else {
        res.status(200).json({
          message: "Fail"
        });
      }
    });
};
exports.deleteDistributor = (req, res) => {
  let id = req.params.id;
  stove_distributor
    .update(
      {
        status: "Inactive"
      },
      {
        where: {
          id: id
        }
      }
    )
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Successful"
        });
      }
    });
};

exports.activateDistributor = (req, res) => {
  let id = req.params.id;
  stove_distributor
    .update(
      {
        status: "Active"
      },
      {
        where: {
          id: id
        }
      }
    )
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Successful"
        });
      }
    });
};
