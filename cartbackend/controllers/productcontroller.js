const { response } = require('express');
const product =require('../models/product');

exports.getAllItem=(req,res)=>{
    product.getAll((err,item)=>{
        if (err) {
            res.status(500).json({error:'internal server error'});
            return;
        }
        res.status(200).json(item);
    });

}

exports.cartAdd=(req,res)=>{
    const productdetial=req.body;

    product.addcart(productdetial,(err,item)=>{
        if(err){
            res.status().json({error:'internal server error'})
            return;
        }
        res.status(200).json(item);
    });
}




