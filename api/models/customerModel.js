var request = require('request');
var Customer = require('../schemas/customerSchema');
var User = require('../schemas/userSchema');



var admin = {


  extractCustomerDetails: function(customer_id,cb){
    
    
    Customer.find().limit(20).exec(function(err, result){
      console.log(err,result)
      if(err){

        //return res.json({code:500, message: "Internal server error."})
      }else{

        return cb(result);
        //return res.json({code:200, data:result})
      }
    })
  },
  
createNewCustomer: function(customer_id,cb){
    var json = {name:"abhsiehk",country:"india",city:"fbd",address:"4 marla",industry:"it",tax_id:"21222",postal_code:"dhbdh",icon:"dhdh",description:"dvgdvdh",telephone1:"262672",telephone2:"djbjdj"};
    var customer = new Customer(json)
    customer.save(function(err, result){
      console.log("date---- ", result)
      var json = {username:"abh",customer_id:result._id};
      var user = new User(json)
      user.save(function(err, result){
        console.log("date---- ", err,result)
        
        //return cb(result);
      })
      //return cb(result);
    })
    
  }
  


}


// function getDate(date, type) {
//   var now = date? new Date(date) : new Date();
//   if(type === "month"){
//       return new Date(now.getFullYear(), now.getMonth(), 1);
//     }
//   now.setHours(0,0,0,0)
//   var day = now.getDay(),
//       diff = now.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
//   return new Date(now.setDate(diff));

//   return monday;
// }
module.exports = admin;