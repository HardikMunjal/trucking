'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serviceSchema = new Schema({
	code:{
		type:String,
		required: true, index: { unique: true }
	},
	name:{
		type:String,
		required: true, index: { unique: true }
	},
	short_name:{
		type:String,
		required: true, index: { unique: true }
	},
	description:{
        type: String
	},
	icon:{
		type :String
	},
	active:{
		type: Boolean
	},
   	createdAt:{
		type:Date,
		default:Date.now
	}
});

var service = mongoose.model('service', serviceSchema);

module.exports = service;