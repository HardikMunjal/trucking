//userSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var customerSchema = new Schema({
// 	name:{
// 		type:String
// 	}
// });
var customerSchema = new Schema({
	name:{
		type:String
	},
	country:{
		type:String
	},
	city:{
		type:String
	},
	address:{
		type:String
	},
	industry:{
		type:String,
		default:null
	},
	tax_id:{
		type:String,
		default:null
	},
	postal_code:{
		type:String,
		default:null
	},
	icon:{
		type:String,
		default:null
	},
	description:{
		type:String,
		default:null
	},
	telephone1:{
		type:String,
		default:null
	},
	telephone2:{
		type:String,
		default:null
	}
});

var customer = mongoose.model('susu', customerSchema);

module.exports = customer;