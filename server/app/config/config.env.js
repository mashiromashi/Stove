const env = {
  database: "stove",
  username: "root",
  password: "mashiro",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  homedir: require("os").homedir + "Fileupload"
};
// const env={
//     database: 'stovemanagement',
//     username: 'sa',
//     password: 'sql@dministr@tor',
//     host: 'localhost',
//     dialect: 'mysql',
//     pool:{
//         max:5,
//         min:0,
//         acquire: 30000,
//         idle:10000
//     },
//     saltRounds: 10,
//     hashkey: 'MY_HASH_PASSWORD'
// }
module.exports = env;
