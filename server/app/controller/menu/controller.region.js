const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stove_region = db.stove_region;

exports.getall = (req, res) => {
  stove_region
    .findAll({
      where: {
        status: "Active"
      }
    })
    .then(data => {
      res.send(data);
    });
};

//added new region if same Region_State name not added new region else added new region
exports.addregion = (req, res) => {
  const data = req.body;
  console.log(data);

  stove_region
    .findAll({
      where: {
        name: data.name,
        status: "Active"
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Fail"
        });
      } else {
        stove_region
          .create({
            name: data.name,
            status: "Active",
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

//update the existing region if the same Region_State name not update
exports.updateRegion = (req, res) => {
  let data = req.body;
  let sqlSyx = `
     select *
     from stove_region
     where name='${data.name}'
     and id!=${data.id}
     and status='Active'`;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      if (result.length === 0) {
        stove_region
          .update(
            {
              name: data.name,
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

//if the region is not still use change 'Active' to 'Inactive'
exports.deleteRegion = (req, res) => {
  let id = req.params.id;

  stove_region
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
