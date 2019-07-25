module.exports = (sequelize, Sequelize) => {
    return (stove_sale = sequelize.define(
        "stove_sale", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            beneficiary_name: {
                type: Sequelize.STRING
            },
            beneficiary_mom_name: {
                type: Sequelize.STRING
            },
            village_id: {
                type: Sequelize.INTEGER
            },
            township_id: {
                type: Sequelize.INTEGER
            },
            region_id: {
                type: Sequelize.INTEGER
            },
            mobile_number: {
                type: Sequelize.STRING
            },
            existing_stove_technology: {
                type: Sequelize.STRING
            },
            existing_cooking_fuel: {
                type: Sequelize.STRING
            },
            model_name: {
                type: Sequelize.STRING
            },
            serial_number: {
                type: Sequelize.STRING
            },
            distribution_date: {
                type: Sequelize.STRING
            },
            retailer_name: {
                type: Sequelize.STRING
            },
            retailer_mom_name: {
                type: Sequelize.STRING
            },
            distributor_id: {
                type: Sequelize.INTEGER
            },
            signature_name: {
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: true,
            tableName: "stove_sale"
        }
    ));
};