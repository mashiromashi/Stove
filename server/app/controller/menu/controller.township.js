const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stove_township = db.stove_township;

exports.getAll = (req, res) => {
  const sqlSyx = `
    select
    t.name,
    t.id,
    t.region_id,
    t.status,
    r.name as regionname
  from
    stove_township as t
    inner join stove_region as r on r.id = t.region_id
  where
    t.status = 'Active'
  `;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(data => {
      res.send(data);
    });
};
exports.getbyid = (req, res) => {
  let id = req.params.id;
  stove_township
    .findAll({
      where: {
        region_id: id
      }
    })
    .then(data => {
      res.send(data);
    });
};
exports.createTownship = (req, res) => {
  const data = req.body;
  stove_township
    .findAll({
      where: {
        name: data.name,
        status: "Active"
      }
    })
    .then(result => {
      if (result.lenth > 0) {
        res.status(200).json({ message: "Fail" });
      } else {
        stove_township
          .create({
            name: data.name,
            region_id: data.selectedRegion.value,
            status: "Active",
            createdby: data.createdby,
            modifiedby: 0
          })
          .then(createResult => {
            if (createResult) {
              res.status(200).json({ message: "Successful" });
            }
          });
      }
    });
};

exports.updateTownship = (req, res) => {
  let data = req.body;
  let sqlSyx = `select *
  from stove_township
  where name = '${data.name}'
  and id != '${data.id}'
  and status ="Active"`;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      if (result.length === 0) {
        stove_township
          .update(
            {
              name: data.name,
              region_id: data.selectedRegion.value,
              modifiedby: data.modifiedby
            },
            {
              where: {
                id: data.id
              }
            }
          )
          .then(updateResult => {
            if (updateResult[0] > 0) {
              res.status(200).json({ message: "Successful" });
            }
          });
      } else {
        res.status(200).json({
          message: "Fail"
        });
      }
    });
};

exports.deleteTownship = (req, res) => {
  let deleteid = req.params.id;
  console.log(deleteid);

  stove_township
    .update(
      {
        status: "Inactive"
      },
      {
        where: {
          id: deleteid
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
