var request = require('request');
var Customer = require('../schemas/customerSchema');
var User = require('../schemas/userSchema');



var admin = {


  fetchAllCustomer: function(data,cb){
    
     Customer.find({}).limit(data.limit).exec(function(err, result){

      if(err){
        console.log("Error:", err);
      }else{
        console.log(result)
        return cb(null,result);
      }
    })
  },

  fetchCustomer: function(data,cb){
    
    var customer=[];
    Customer.find({_id:data.customer_id}).exec(function(err, result){

      if(err){
        console.log("Error:", err);
      }else{
        console.log(result)
        customer=result;
        User.find({customer_id:data.customer_id}).exec(function(err, result){

         if(err){
            console.log("Error:", err);
          }else{
            console.log('selected users',result)
            //var bhalu = customer;
            customer.contacts= result;
            //bhalu[0].userggg=result;
            
            //console.log(bhalu[0].userggg)
            return cb(null,customer);
            //return res.json({code:200, data:result})
          }
        })
        //return cb(null,result);
        //return res.json({code:200, data:result})
      }
    })
  },
  
  createNewCustomer: function(data,cb){
      var json = data.customer;
      var customer = new Customer(json)
      customer.save(function(err, result){
        console.log("date---- ", result);

        if(data.users){
          data.users.forEach(function(user, index) {
            user.customer_id=result.id;
          });
        
          var user = new User(data.users[0])
          user.save(function(err, result){
            console.log("date---- ", err,result)
              
              return cb(null,result);
          })
        }

        return cb(null,result);
      })
   
  },
 
  updateCustomer: function(data,cb){
      //var json = data.customer;
      //var customer = new Customer(json)
       Customer.update({_id: data.customer_id}, data.customer, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    }
  };



module.exports = admin;