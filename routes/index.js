var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('products', { title: 'My title' });
});

router.post('/placeOrder', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var orderNo = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  res.send(JSON.stringify({ "success": true, "ordernumber": orderNo }));
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: 'My title' });
});

module.exports = router;
