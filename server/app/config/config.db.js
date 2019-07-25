const env = require("./config.env");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.stove_distributor = require('../model/menu/model.distributor')(sequelize, Sequelize)
db.stove_user = require('../model/menu/model.user')(sequelize, Sequelize)
db.stove_region = require('../model/menu/model.region')(sequelize, Sequelize)
db.stove_village = require('../model/menu/model.village')(sequelize, Sequelize)
db.stove_sale = require('../model/menu/model.sale')(sequelize, Sequelize)
db.stove_stoveType = require('../model/menu/model.stoveType')(sequelize, Sequelize)
db.stove_township = require('../model/menu/model.township')(sequelize, Sequelize);
db.stove_declaration_form = require('../model/menu/model.declaration_form')(sequelize, Sequelize);
module.exports = db;