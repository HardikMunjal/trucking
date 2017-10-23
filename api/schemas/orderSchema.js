//customerSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// column                      column name
// F                           Client id
// K                          Client name
// G                          Ordernumber
// M                          Quantity
// E                           Date and time


var orderSchema = new Schema({
	customer:{
		type:String,
		default:null
	},
	client_id:{
		type:String,
		default:null
	},
	product_id:{
		type:String,
		default:null
	},
	client_name:{
		type:String,
		default:null
	},
	order_num:{
		type:String,
		default:null,
		required: true,
		index: { unique: true }
	},
	qty:{
        type: String,
		default:null
	},
	date_time:{
		type:String,
		default:null
	},
	
	status:{
		type:String,
		default:null
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

var order = mongoose.model('order', orderSchema);

module.exports = order;