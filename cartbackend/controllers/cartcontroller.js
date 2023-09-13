
const cartdata=require('../models/cartview')

exports.cartitemview=(req,res)=>{
    const sessionid=req.body.sessionid
    
    cartdata.getcart(sessionid,(err,data)=>{
        if(err){
            res.status(500).json({error:'internal server error'});
            return;
        }
        res.status(200).json(data)
    })
}