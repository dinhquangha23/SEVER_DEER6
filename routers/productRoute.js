const express = require('express');
const productRoute = express.Router();

const connec= require('../models/connectDB')
// Middleware để xử lý lỗi async
const connection = connec()
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};


productRoute.get("/product",asyncHandler( async(req, res)=>{
  const connection = await connec();
  const {start,end} = req.query;
  if(start&&end){
    const sta=parseInt(start);
    const en=parseInt(end);

    try {
      const [results]= await connection.query('SELECT * FROM products LIMIT ?, ?',[sta,en])
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
    }finally{

    }

  }else{
    try {
      const [results, fields] = await connection.query('SELECT * FROM products');
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
    }finally {
      await connection.end();
    }
  }
  

}));
productRoute.get("/product/:id",asyncHandler(async(req,res)=>{
    const connection = await connec();
    const id = req.params?.id;
    try {
      // const [[results]]= await connection.query('SELECT * FROM products WHERE id= ?',[id])
      const [results]= await connection.query('SELECT * FROM products WHERE id= ?',[id])
      
      res.json(results);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu' });
    }finally{
      await connection.end();
    } 
  // res.json(req.params?.id)
}))



                                //search feature
productRoute.get("/search",asyncHandler(async(req,res)=>{
  const connection = await connec();
  const search = req.query?.search;
  try {
    const [results]= await connection.query(`SELECT * FROM \`products\` WHERE products.Title LIKE "%${search}%"`)
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu trong search product' });
  }finally{
    await connection.end();
  } 

}))

module.exports = productRoute;