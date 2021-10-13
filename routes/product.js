var express=require('express')
var router = express.Router()
const ProductModule = require('../Module/productModule')

router.post('/saveproduct',ProductModule.postProduct)
router.get('/getproducts',ProductModule.getProduct)
router.get("/checkbox/:name",ProductModule.getCheckboxProduct)
router.get('/searchInput/:name',ProductModule.getInputProduct)

module.exports = router