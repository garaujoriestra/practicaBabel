'use strict';

//conectar con mongoose
let mongoose = require('mongoose');

//Creo el esquema
let saleSchema = mongoose.Schema({
	name: String,
	description: String,
	picture: String,
	owner: String,
	minimumPrice: Number,
	bid: Number,
	bestBidder: String,
	timeToSale: String,
	tag: [String]
});
//Lista de los Anuncios
saleSchema.statics.list = function(cb){	
	let query = Sale.find();
	query.exec(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
//Devuelve un anuncio filtrandolo por su id.
saleSchema.statics.getOneId = function(id,cb){	
	let query = Sale.find({_id:id});
	query.exec(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
//Devuelve un anuncio filtrandolo por su id.
saleSchema.statics.deleteOneId = function(id,cb){	
	let query = Sale.find({_id:id});
	query.remove(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
let Sale = mongoose.model("Sale", saleSchema);	