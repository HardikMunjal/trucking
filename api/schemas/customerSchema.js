//customerSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./userSchema');


var customerSchema = new Schema({
	name:{
		type:String,
		default:null
	},
	country:{
		type:String,
		default:null
	},
	city:{
		type:String,
		default:null
	},
	address:{
		type:String,
		default:null
	},
	active:{
        type: String,
		default:null
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
	RNC_no:{
		type:String,
		default:null
	},
	website:{
       type:String,
		default:null
	},
	telephone1:{
		type: String,
		default:null
	},
	telephone2:{
		type:String,
		default:null
	},
	contacts:{
       type: Array,
		default:null
	},
	contact_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	// fans: [{ 
	// 		  user_id:{type: Schema.Types.ObjectId, ref: 'User'}
	// 	  }],
	createdAt:{
		type:Date,
		default:Date.now
	}
});

var customer = mongoose.model('customer', customerSchema);

module.exports = customer;