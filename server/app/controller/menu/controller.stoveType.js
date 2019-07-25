//initialize db
const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stoveType = db.stove_stoveType;

//fetches all the current stove types
exports.getAll = (req, res) => {
  stoveType
    .findAll({
      where: {
        status: "Active"
      }
    })
    .then(data => {
      res.send(data);
    });
};
exports.mobilegetAll = (req, res) => {
  stoveType
    .findAll(
      {
        attributes: ["id", "type"]
      },
      {
        where: {
          status: "Active"
        }
      }
    )
    .then(data => {
      res.send(data);
    });
};
//create new stove type
exports.createStoveType = (req, res) => {
  const stovetype = req.body;
  stoveType
    .findAll({
      where: {
        type: stovetype.stovetype,
        status: "Active"
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({ message: "Fail" });
      } else {
        stoveType
          .create({
            type: stovetype.stovetype,
            remark: stovetype.remark,
            status: "Active",
            createdby: stovetype.createdby,
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

//stove type update
exports.updateStoveType = (req, res) => {
  let data = req.body;
  let sqlSyx = `
   select *
   from stovetype
   where type='${data.type}'
   and id!=${data.id}
   and status='Active'`;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      if (result.length === 0) {
        stoveType
          .update(
            {
              type: data.type,
              remark: data.remark,
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

exports.deleteStoveType = (req, res) => {
  let id = req.params.id;

  stoveType
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
      if (result[0] > 0) {
        res.status(200).json({ message: "Successful" });
      } else {
        res.status(200).json({ message: "Fail" });
      }
    });
};
