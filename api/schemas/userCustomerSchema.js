'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userCustomerSchema = new Schema({
	customer_id:{
        type: String,
        default:''
    },
    user_id:{
        type: String,
        default:''
    },
	type:{
        type: String,
        default:null
	},
	username:{
		type:String,
        default:null
	},
    department:{
        type: String,
        default:null
    },
	createdAt:{
		type:Date,
		default:Date.now
	},
    created_by:{
        type:String,
        default:null
    }
});
//here user-customer, from which collection name will be defined
var userCustomer = mongoose.model('user-customer', userCustomerSchema);

module.exports = userCustomer;