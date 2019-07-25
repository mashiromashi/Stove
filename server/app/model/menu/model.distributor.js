module.exports = (sequelize, Sequelize) => {
    return (stove_distributor = sequelize.define(
        "stove_distributor", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            regionid: {
                type: Sequelize.INTEGER
            },
            distributorname: {
                type: Sequelize.STRING
            },
            distributorid: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            createdby: {
                type: Sequelize.INTEGER
            },
            modifiedby: {
                type: Sequelize.INTEGER
            }
        }, {
            freezeTableName: true,
            tableName: "stove_distributor"
        }
    ));
};