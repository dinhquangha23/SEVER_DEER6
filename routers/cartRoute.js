const express = require('express');
const cartRoute = express.Router();
const connec= require('../models/connectDB')
// Middleware để xử lý lỗi async
// const connection = connec()
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

cartRoute.get("/carts",asyncHandler(async(req,res)=>{
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
cartRoute.post("/carts",asyncHandler(async(req,res)=>{
    const connection= await connec();
    connection.config.namedPlaceholders = true;// sử dụng biến dữ chỗ
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
    
}))
cartRoute.put("/carts/:id",asyncHandler(async(req,res)=>{
    const connection= await connec();
    
    const id = req.params?.id
    const quantity = req.body?.quantity
    try {
        const [results,fill]= await connection.execute("UPDATE cart SET cart.quantity=? WHERE cart.id_product=?",[quantity,id])
        // console.log({results,data: fill})
        // const { changedRows, ...result } = results;
        results.rowUpdate= results.affectedRows
        delete results.affectedRows
        console.log(results)
        res.json(results);

    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu thêm' });
    } finally{
        await connection.end();
    }
    console.log(id)
    console.log("quantity",req.body)
    
}))


module.exports = cartRoute;