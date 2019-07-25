module.exports = (sequelize, Sequelize) => {
    return (stove_village = sequelize.define(
        "stove_village", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            townshipid: {
                type: Sequelize.INTEGER
            },
            villagename: {
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
            freezeTimeTable: true,
            tableName: "stove_village"
        }
    ));
};