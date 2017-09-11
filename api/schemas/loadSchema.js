'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var loadSchema = new Schema({
	
	name:{
		type:String,
		required: true, index: { unique: true }
	},
	type:{
        type: String,
        required: true
	},
	weight:{
		type :Object
	},
	slot_time:{
		type:Date
	},
    organization:{
        type:String
    },
	createdAt:{
		type:Date,
		default:Date.now
	}
});

var load = mongoose.model('load', loadSchema);

module.exports = load;