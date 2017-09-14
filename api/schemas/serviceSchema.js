'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serviceSchema = new Schema({
	code:{
		type:String,
		default:null//,required: true, index: { unique: true }
	},
	name:{
		type:String,
		default:null
		//,required: true, index: { unique: true }
	},
	short_name:{
		type:String,
		default:null//,required: true, index: { unique: true }
	},
	description:{
        type: String,
		default:null
	},
	
	icon:{
		type :String,
		default:null
	},
	active:{
		type: String,
		default:null
	},
   	createdAt:{
		type:Date,
		default:Date.now
	}
});

var service = mongoose.model('service', serviceSchema);

module.exports = service;