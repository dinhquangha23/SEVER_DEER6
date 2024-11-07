const express = require('express');
const cartRoute = express.Router();
const connec= require('../models/connectDB')
// Middleware để xử lý lỗi async
// const connection = connec()
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

cartRoute.get("/cart",asyncHandler(async(req,res)=>{
    const connection = await connec();
    try {
        const [results]= await connection.query('SELECT cart.id,products.Title,cart.color,cart.size,cart.quantity,products.price,products.firstimage AS "thumbnail" FROM `cart` JOIN `products` ON cart.id_product=products.id')
        res.json(results);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu cart' });
    } finally{
        await connection.end();
    }
}))
cartRoute.post("/cart",asyncHandler(async(req,res)=>{
    const connection= await connec();
    connection.config.namedPlaceholders = true;
    const {id_product,color,size,quantity}=req.body;
    try {
        const [results,fill]= await connection.execute("INSERT INTO `cart`(`id_product`,`color`,`size`,`quantity`) VALUES (:id_product, :color, :size, :quantity)",{id_product:3, color: "Black", size: "L", quantity:5})
        console.log({results,data: fill})
        res.json(results);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu thêm' });
    } finally{
        await connection.end();
    }
    console.log(req.body)
    res.json("oke")
}))


module.exports = cartRoute;