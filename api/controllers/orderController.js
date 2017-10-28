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
  },
  
  fetchOrder: function(req, res, next) {
   
    var data = {};
    data.o_id = req.params.order_id ? req.params.order_id : null;

    orderModel.fetchOrder(data,function(err, result){
        if(err && err==='Not Found'){
          var message = "Order Id Not Found"
         return res.status(410).send(message);
         }
        
        else if(err){
          return res.status(410).send(err.message);
        }
         
         return res.json(result);
      })

  },
  createNewOrder: function(req, res, next) {
   
    var data = {};
    var o_id= true;   
   

   
    data.order = req.body;
   
    orderModel.createNewOrder(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
        console.log(result)
        if(!result){
          var message = "Some Error Occurred";
    
          return res.status(400).send(message);
        }
        return res.json("Order added successfully");
    })
  },

  updateOrder: function(req, res, next) {
      
   var data={};
   data.o_id = req.params.order_id ? req.params.order_id : null;
   data.order=req.body;
    orderModel.updateOrder(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }

        console.log(result)
         return res.json("Order updated successfully");
    })

  },

  deleteOrder: function(req, res, next) {
      
   var data={};
   data.o_id = req.params.order_id ? req.params.order_id : null;
   orderModel.deleteOrder(data,function(err, result){
        if(err){
          return res.status(410).send(err.message);
        }
        console.log(result)
        return res.json("Order deleted successfully");
    })

  }
}
module.exports = order;