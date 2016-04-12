'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Sale = mongoose.model("Sale");
var SaleWin = mongoose.model("SaleWin");
var moment = require('moment');


//Inserta un anuncio en la bbdd y devuelve un json con ese anuncio.
router.post("/", function(req, res){
	var fechaExpiracion = moment().add(parseInt(req.body.timeToSale), 'hours');
	req.body.timeToSale = fechaExpiracion;
	let sale = new Sale(req.body);
	sale.save(function (err, newRow) {
		if (err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: newRow});
		return;
	});
});
//Elimina un anuncio en la bbdd y devuelve un json con ese anuncio.
router.delete("/:id", function(req, res){
	let query = Sale.find({_id:req.params.id});
	query.exec(function(err,rows){
		if(rows[0].bestBidder == ""){
			Sale.deleteOneId(req.params.id,function(err,rows){
				if(err){
					res.json({result: false, err: err});
					return;
				}
				res.json({result: true,rows: rows});
				return;
			});	
		}else{
			var winArrayInfo = {name : rows[0].name, description: rows[0].description, picture: rows[0].picture, bid: rows[0].bid, timeToSale: rows[0].timeToSale };
			var saleWin = {name : rows[0].bestBidder, sale: winArrayInfo };
			let saleWinSave = new SaleWin(saleWin);
			saleWinSave.save(function (err, newRow) {
				if (err){
					res.json({result: false, err: err});
					return;
				}
				Sale.deleteOneId(req.params.id,function(err,rows){
					if(err){
						res.json({result: false, err: err});
						return;
					}
					res.json({result: true,rows: rows});
					return;
				});
			});
		}
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
		
		Sale.getOneId(req.params.id,function(err,rows){
			if(err){
				res.json({result: false, err: err});
				return;
			}
			console.log("Place en bbdd : ", rows);
			res.json({result: true,rows: rows});
			return;
		});
	});
});
module.exports = router;

