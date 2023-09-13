const db = require('../db')

class cartdata {
    static async getcart(sessionid,callback){
  try{
    let tempresult=[];
    const masteridresult= await new Promise((resolve,reject)=>{
        db.query('SELECT id FROM order_table_master WHERE sessionid = ?',[sessionid],(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })

    if (masteridresult.length > 0) {
        const masterId = masteridresult[0].id;
        
        const temptableresult=await new Promise((resolve,reject)=>{
            
            db.query('SELECT * FROM ordertemp WHERE omid = ? ',[masterId],(err,results)=>{
                if(err){
                    reject(err)  
                }else{
                    resolve(results)
                }
            
            })
            
        })
        tempresult=temptableresult
       
    }
    // console.log('value of odertempdata',tempresult)

    let cartproductdata=[];
    let productrow=[];
    let formateddata=[];
    let cartTotal=0;
    let carttotalvalue=[]
    
    for (const pdata of tempresult) {
       
        const pid = pdata.pid;
        productrow = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM products where pid = ?', [pid], (err, getcartresult) => {
                if (err) {
                    console.error('Error fetching product:', err);
                    reject(err);
                } else {
                   
                    resolve(getcartresult);
                }
            });
        });
    
        if (productrow && productrow.length > 0) {
            cartTotal += parseFloat(pdata.producttotal);
            const data = {
                "oid": pdata.oid,
                "qty": pdata.productqty,
                "total": pdata.producttotal,
                "pid": pid,
                "name": productrow[0].name,
                "imageurl": productrow[0].imageurl,
                "rate": productrow[0].rate,
                "carttoatal":cartTotal
              };
            formateddata.push(data)
            
            cartproductdata.push(productrow[0]);
            // cartTotal += parseFloat(pdata.producttotal);

        }
        
    }
    carttotalvalue=cartTotal
    const finalresult={
       'cartdata':formateddata,
       'cartTotal': carttotalvalue
    }

    console.log('Product Details:',finalresult);
    console.log('Cart Total:', cartTotal);
    return callback(null,formateddata);
  }catch(err){
    return callback(err)
  } 


    }

}


module.exports=cartdata