const db = require('../db')
const jwt = require('jsonwebtoken');

class product{

    static getAll(callback){
        db.query('SELECT * FROM products', callback)
        
    }

    static async addcart(productdetail, callback) {
  try {
    let { pid, sessionId, rate: productprice, quantity: productqty } = productdetail;
    const producttotal = productqty * productprice;
    const formattedDate = new Date().toLocaleDateString('en-GB');
    let tokenvalue;

    if (sessionId === 'null') {
      // Session ID is null, generate a JWT token
      const secretKey = 'your-secret-key';
      const tokenPayload = { pid: '123' };
      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1 hour' });
      sessionId = token;
      tokenvalue = token;

      console.log('Generated JWT token:', token);
    }

    // Session ID is not null, proceed with database operations
    let omid;

    // Check if a master order already exists for the session ID
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT id FROM order_table_master WHERE sessionid = ?', [sessionId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (results.length > 0) {
      // A master order exists, get the existing master order ID
      omid = results[0].id;
    } else {
      
      const newOrderMasterValues = [[sessionId, formattedDate]];
      
      // Insert a new record into order_table_master
      const result = await new Promise((resolve, reject) => {
        db.query('INSERT INTO order_table_master (sessionid, date) VALUES ?', [newOrderMasterValues], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      omid = result.insertId;
      
    }

    
    const newOrderTempValues = [[pid, omid, productprice, productqty, producttotal]];
    

    // Insert data into ordertemp
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO ordertemp (pid, omid, productprice, productqty, producttotal) VALUES ?', [newOrderTempValues], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          console.log('insert',result)
        }
      });
    });

    // Calculate the total and update it in order_table_master
    const sumResult = await new Promise((resolve, reject) => {
      db.query('SELECT SUM(producttotal) AS total FROM ordertemp WHERE omid = ?', [omid], (err, sumResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(sumResult);
        }
      });
    });

    const total = sumResult[0].total;

    await new Promise((resolve, reject) => {
      db.query('UPDATE order_table_master SET total = ? WHERE id = ?', [total, omid], (err, updateResult) => {
        if (err) {
          reject(err);
        } else {
          resolve(updateResult);
        }
      });
    });

    return callback(null, { token: tokenvalue });
  } catch (err) {
    return callback(err);
  }
}

 
}

module.exports=product