'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Sale = mongoose.model("Sale");

//Inserta un anuncio en la bbdd y devuelve un json con ese anuncio.
router.post("/", function(req, res){
	//Falta por hacer lo de poner bien el dia para que acabe la subasta.
	var horaActual = new Date();
	var horaFinaliza = horaActual.setHours(horaActual.getHours());
	let sale = new Sale(req.body);
	sale.timeToSale = horaFinaliza;
	sale.save(function (err, newRow) {
		if (err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: newRow});
		return;
	});
});
//Devuelve la lista de todos los anuncios de la bbdd.
router.get("/", function(req,res){
	Sale.list(function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true,rows: rows});
		return;
	});
});
//Devuelve un anuncio dada su id(recibida como parámetro).
router.get("/:id", function(req,res){
	Sale.getOneId(req.params.id,function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true,rows: rows});
		return;
	});
});
//Actualiza la información de un anuncio de la bbdd. Y lo devuelve.
router.put("/:id" , function(req,res){
	Sale.findOneAndUpdate({_id:req.params.id}, req.body, function (err, place) {
	  if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true,rows: place});
		return;
	});
});
module.exports = router;

