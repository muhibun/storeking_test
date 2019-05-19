const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.connect('mongodb://127.0.0.1:27017/dishes_db', { useNewUrlParser: true }, function(err, db){
	if(err){
		console.log(err);
	}else{
		console.log("connect to "+'mongodb://127.0.0.1:27017/dishes_db');
	}
});
const Schema = mongoose.Schema;
mongoose.Promise = Promise;
const dishes = new Schema({
	dishesId: {
		type: Number
	},
  dishesName: {
		type: String,
		required: true
	},
  createdDate: {
		type: Date,
		required: true
	},
  isActive: {
		type: Number,
		required: true
	}
}, { versionKey: false });
dishes.plugin(AutoIncrement, {inc_field: 'dishesId'});
exports.dishes = mongoose.model('dishes', dishes);

