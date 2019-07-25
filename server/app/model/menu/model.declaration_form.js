module.exports = (sequelize, Sequelize) => {
    return (declaration_form = sequelize.define(
        "declaration_form", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            sale_id: {
                type: Sequelize.INTEGER
            },
            img: {
                type: Sequelize.STRING
            }
        }, {
            freezeTimeTable: true,
            tableName: "declaration_form"
        }
    ));
};