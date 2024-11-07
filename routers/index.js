const express = require('express');
const router = express.Router();
// const express = require('express');
// const productRoute = express.Router();

// const connec= require('../models/connectDB')
// // Middleware để xử lý lỗi async
// const connection = connec()
// const asyncHandler = fn => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// productRoute.get("/", asyncHandler(async (req, res) => {
  

//   try {
//     const [results, fields] = await connection.query('SELECT * FROM users');
//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu product' });
//   } finally {
//     await connection.end();
//   }
// }));

// productRoute.get("/product", async(req, res)=>{
//   const connection = await connec();
//   const {start,end} = req.query;
//   if(start&&end){
//     const sta=parseInt(start);
//     const en=parseInt(end);

//     try {
//       const [results]= await connection.query('SELECT * FROM products LIMIT ?, ?',[sta,en])
//       res.json(results);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
//     }finally{

//     }

//   }else{
//     try {
//       const [results, fields] = await connection.query('SELECT * FROM products');
//       res.json(results);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
//     }finally {
//       // await connection.end();
//     }
//   }
  

// });

// module.exports = productRoute;
const cartRoute = require('./cartRoute');
const productRote= require('./productRoute');
//router cart
router.use(cartRoute)
// router product
router.use(productRote)
module.exports=router