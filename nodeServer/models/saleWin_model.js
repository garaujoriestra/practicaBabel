'use strict';

//conectar con mongoose
let mongoose = require('mongoose');

//Creo el esquema
let saleWinSchema = mongoose.Schema({
	name: String,
	sale: [{name: String, description: String, picture: String, bid: Number, timeToSale: String }]
});
//Lista de los Anuncios
saleWinSchema.statics.list = function(cb){	
	let query = SaleWin.find();
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
saleWinSchema.statics.getListByName = function(name,cb){	
	let query = SaleWin.find({name:name});
	query.exec(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
let SaleWin = mongoose.model("SaleWin", saleWinSchema);	