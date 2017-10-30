'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var coveringAreaSchema = new Schema({
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

var cov_area = mongoose.model('cov_area', coveringAreaSchema);

module.exports = cov_area;