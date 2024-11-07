const mysql2 = require('mysql2/promise');
let connection = async ()=>{
    const connectDB = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'deer6_shop',
      });
      return connectDB;
}


module.exports = connection;