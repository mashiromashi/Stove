module.exports = (sequelize, Sequelize) => {
  return (stoveType = sequelize.define(
    "stoveType",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      type: {
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.STRING
      },
      createdby:{
        type:Sequelize.INTEGER
      },
      modifiedby:{
        type:Sequelize.INTEGER
      }
    },
    {
      freezeTableName: true,
      tableName: "stoveType"
    }
  ));
};
