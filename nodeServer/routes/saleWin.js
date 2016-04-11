'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var SaleWin = mongoose.model("SaleWin");


//Inserta un anuncio en la bbdd de ganadas y devuelve un json con ese anuncio.
router.post("/", function(req, res){
	let saleWin = new SaleWin(req.body);
	saleWin.save(function (err, newRow) {
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
	SaleWin.list(function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true,rows: rows});
		return;
	});
});
//Devuelve la lista de todos los anuncios de la bbdd por un nombre.
router.get("/", function(req,res){
	SaleWin.list(function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true,rows: rows});
		return;
	});
});

//Devuelve un usuario dado su nombre(como parametro name).
router.get('/:name', function(req, res) {
	SaleWin.getListByName(req.params.name,function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: rows});
		return;
	});
});
module.exports = router;

