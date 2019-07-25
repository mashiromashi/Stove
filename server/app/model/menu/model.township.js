module.exports = (sequelize, Sequelize) => {
    return (stove_township = sequelize.define(
        "stove_township", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING
            },
            region_id: {
                type: Sequelize.INTEGER
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
            tableName: "stove_township"
        }
    ));
};