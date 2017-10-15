var orderModel = require('../models/orderModel');
var async = require('async');

var order = {

  fetchAllOrder: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    orderModel.fetchAllOrder(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  }
}
module.exports = order;