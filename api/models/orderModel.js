var request = require('request');
var Order = require('../schemas/orderSchema');


var oModel = {


  fetchAllOrder: function(data,cb){
    
     Order.find({}).limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        

        return cb(null,result);
      }
    })
  },

  
  
  createNewBulkOrders: function(data,cb){

      var rawDocuments = data.raw;

      Order.insertMany(rawDocuments)
          .then(function(mongooseDocuments) {
               return cb(null,mongooseDocuments);
          })
          .catch(function(err) {
              return cb(err);
              /* Error handling */
          });
      // var json = data.load;
      // var load = new Load(json)
      // load.save(function(err, result){
      //       return cb(null,result);
      // })
    }
  };



module.exports = oModel;