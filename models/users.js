const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true 
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
});

UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('users', UserSchema);