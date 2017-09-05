//customerSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
	active:{
        type: Boolean
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
		type:Number,
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
		type:Number,
		default:null
	},
	telephone2:{
		type:Number,
		default:null
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

var customer = mongoose.model('customer', customerSchema);

module.exports = customer;