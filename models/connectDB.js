const mysql2 = require('mysql2/promise');
require('dotenv').config();
let connection = async ()=>{
  const connectDB = await mysql2.createConnection({
      host:process.env.MYSQL_ADDON_HOST,
      user:process.env.MYSQL_ADDON_USER,
      password:process.env.MYSQL_ADDON_PASSWORD,
      database:process.env.MYSQL_ADDON_DB,
      port:process.env.MYSQL_ADDON_PORT,
      connectionLimit: 10,
    });
    return connectDB;
}


module.exports = connection;