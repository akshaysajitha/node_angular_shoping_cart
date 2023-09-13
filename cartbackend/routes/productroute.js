const express=require('express');
const router = express.Router();
const productcontrol=require('../controllers/productcontroller')
const cartcontrol=require('../controllers/cartcontroller')

router.get('/views',productcontrol.getAllItem)
router.post('/addtocart',productcontrol.cartAdd)
router.post('/cartview',cartcontrol.cartitemview)

module.exports = router;