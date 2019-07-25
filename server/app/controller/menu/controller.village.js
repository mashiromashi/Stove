const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stove_village = db.stove_village;

//retrieve all village data
exports.getAll = (req, res) => {
  const sqlSyx = `
  select
    v.villagename,
    v.townshipid,
    v.id,
    t.name as townshipname
  from
    stove_village as v
    inner join stove_township as t on t.id = v.townshipid
  where
    v.status = 'Active'
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
  stove_village
    .findAll({
      where: {
        townshipid: id
      }
    })
    .then(data => {
      res.send(data);
    });
};
//add new village if have same village not add the new village
exports.addvillage = (req, res) => {
  const data = req.body;
  stove_village
    .findAll({
      where: {
        villagename: data.villagename,
        status: "Active"
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({ message: "Fail" });
      } else {
        stove_village
          .create({
            villagename: data.villagename,
            townshipid: data.selectedTownship.value,
            status: "Active",
            createdby: data.createdby,
            modifiedby: 0
          })
          .then(createresult => {
            if (createresult) {
              res.status(200).json({ message: "Successful" });
            }
          });
      }
    });
};

//update the village if same name not update the data
exports.updateVillage = (req, res) => {
  let data = req.body;
  let sqlSyx = `select * from stove_village where villagename='${
    data.villagename
  }'
                 and id!=${data.id} and status='Active' and townshipid=${
    data.selectedTownship.value
  }`;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      if (result.length === 0) {
        stove_village
          .update(
            {
              villagename: data.villagename,
              townshipid: data.selectedTownship.value,
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
              res.status(200).json({ message: "Successful" });
            }
          });
      } else {
        res.status(200).json({ message: "Fail" });
      }
    });
};

exports.deleteVillage = (req, res) => {
  let id = req.params.id;

  stove_village
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
