'use strict';

//conectar con mongoose
let mongoose = require('mongoose');

//Creo el esquema
let userSchema = mongoose.Schema({
 name: String,
 password: String
});

//Devuelve lista de usuarios
userSchema.statics.list = function(cb){
	let query = User.find();
	query.exec(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
//Devuelve un usuario por Nombre
userSchema.statics.getOneName = function(name,cb){	
	let query = User.find({name:name});
	query.exec(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
//Lo registro en moongose
let User = mongoose.model("User", userSchema);	