const express=require('express');
const router = express.Router();
const productcontrol=require('../controllers/productcontroller')

router.get('/views',productcontrol.getAllItem)
router.post('/addtocart',productcontrol.cartAdd)

module.exports = router;