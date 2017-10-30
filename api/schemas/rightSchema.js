//customerSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var rightSchema = new Schema({
	name:{
		type:String,
		default:null
	},
	code:{
		type:String,
		default:null
	},
	
	createdAt:{
		type:Date,
		default:Date.now
	},
	updatedAt:{
		type:Date,
		default:Date.now
	},
	created_by:{
		type:String,
		default:null
	}
});

var right_u = mongoose.model('right_u', rightSchema);

module.exports = right_u;