const db = require('../db')
class product{

    static getAll(callback){
        db.query('SELECT * FROM products', callback)
    }

    static addcart(pid,callback){
        db.query('SELECT * FROM products WHERE ?', [pid], callback);
    }



}

module.exports=product