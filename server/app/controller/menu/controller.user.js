const db = require("../../config/config.db");
const sequelize = db.sequelize;
const stove_user = db.stove_user;

//fetches all the current registered users
exports.getAll = (req, res) => {
  stove_user
    .findAll({
      where: { status: "Active" }
    })
    .then(data => {
      res.status(200).send(data);
    });
};

//create new user
exports.createUser = (req, res) => {
  const data = req.body;
  stove_user
    .findAll({
      where: {
        emailaddress: data.emailaddress,
        phone: data.phone,
        status: "Active"
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({ message: "Fail" });
      } else {
        stove_user
          .create({
            username: data.username,
            password: data.password,
            status: "Active",
            emailaddress: data.emailaddress,
            address: data.address,
            phone: data.phone,
            role: "Admin",
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

exports.updateUser = (req, res) => {
  let data = req.body;
  console.log(data);
  let sqlSyx = `
  select *
  from user
  where emailaddress='${data.emailaddress}'
  and userid!=${data.userid}
  and status='Active'
  and phone=${data.phone}`;
  sequelize
    .query(sqlSyx, {
      type: sequelize.QueryTypes.SELECT
    })
    .then(result => {
      if (result.length === 0) {
        stove_user
          .update(
            {
              emailaddress: data.emailaddress,
              address: data.address,
              phone: data.phone,
              username: data.username,
              modifiedby: data.modifiedby
            },
            {
              where: {
                userid: data.userid
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

//Delete User
exports.deleteUser = (req, res) => {
  let id = req.params.id;
  stove_user
    .update(
      {
        status: "Inactive"
      },
      {
        where: {
          userid: id
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

exports.login = (req, res) => {
  let data = req.body;
  stove_user
    .findAll({
      where: {
        username: data.username,
        password: data.password
      }
    })
    .then(result => {
      if (result.length > 0) {
        res.status(200).json({ message: "Successful", data: result });
      } else {
        res.status(200).json({ message: "Fail" });
      }
    });
};
