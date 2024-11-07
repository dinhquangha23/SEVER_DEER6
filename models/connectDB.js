const mysql2 = require('mysql2/promise');
require('dotenv').config();
// let connection = async ()=>{
//   const connectDB = await mysql2.createConnection({
//       host:process.env.MYSQL_ADDON_HOST,
//       user:process.env.MYSQL_ADDON_USER,
//       password:process.env.MYSQL_ADDON_PASSWORD,
//       database:process.env.MYSQL_ADDON_DB,
//       port:process.env.MYSQL_ADDON_PORT,
//       connectionLimit: 10,
//     });
//     return connectDB;
// }

let connection = async ()=>{
  const connectDB = await mysql2.createConnection({
      host:'bakfrgqh7wldvmrbkxlo-mysql.services.clever-cloud.com',
      user:'us7olytu9c3m3sv8',
      password:'n3IuC04CZtkSyIflmONG',
      database:'bakfrgqh7wldvmrbkxlo',
      port:'3306',
      connectionLimit:10,
    });
    return connectDB;
}

module.exports = connection;