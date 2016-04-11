"use strict";
var express = require('express');
var router = express.Router();
require("./models/sale_model.js");
require("./models/user_model.js");
require("./models/saleWin_model.js");
var mongoose = require("mongoose");
var Sale = mongoose.model("Sale");
var User = mongoose.model("User");
var SaleWin = mongoose.model("SaleWin");
var conn = require("./lib/connectMongoose");
var sha = require("sha256");
var fs = require("fs");
var async = require("async");
var moment = require('moment');


//Función para reiniciar toda la base de datos de sales. Devuelve una promesa.
function ClearSales(){
	return new Promise(function(resolve,reject){
		Sale.remove({},function(err) {
			if(err){
				reject(console.log("Error al eliminar los anuncios"));
			}
			resolve(console.log("Eliminados satisfactoriamente" ));
		});
	});
}
//Función para reiniciar toda la base de datos de usuarios. Devuelve una promesa.
function ClearUsers(){
	return new Promise(function(resolve,reject){
		User.remove({},function(err) {
			if(err){
				reject(console.log("Error al eliminar los anuncios"));
			}
			resolve(console.log("Eliminados satisfactoriamente" ));
		});
	});
}
//Función para reiniciar toda la base de datos de subastas ganadoras. Devuelve una promesa.
function ClearSaleWins(){
	return new Promise(function(resolve,reject){
		SaleWin.remove({},function(err) {
			if(err){
				reject(console.log("Error al eliminar los anuncios ganadores"));
			}
			resolve(console.log("Eliminados satisfactoriamente" ));
		});
	});
}
//Función para insertar sales de prueba de un fichero json. Devuelve una promesa con el array recibido.
//Utiliza Async.
//Recibe un array de sales.
function InsertSales(sales){
	return new Promise(function(resolve,reject){
		let salesArray = sales["sales"];
		async.each(salesArray, function(file, callback) {	
		  var fechaExpiracion = moment().add(parseInt(file.timeToSale), 'hours');
		  file.timeToSale = fechaExpiracion;
		  let sale = new Sale(file);
		  sale.save(function (err, newRow) {
		    callback();
		  });
		}, function(err){
		    if( err ) {
		      reject(console.log('Error al insertar los sales '));
		    } else {
		    	console.log('Todos los sales se han insertado correctamente.');
		    	resolve(sales);
		    }
		});
	});
}
//Función para insertar usuarios de prueba de un fichero json. Devuelve una promesa. Utiliza Async.
//Recibe un array de usuarios.
function InsertUsers(info){
	return new Promise(function(resolve,reject){
		let usersArray = info["users"];
		async.each(usersArray, function(usersArray, callback) {
		  let user = new User(usersArray);
		  user.password = sha(usersArray.password);	
		  user.save(function (err, newRow) {
		    callback();
		  });
		}, function(err){
		    if( err ) {
		      reject(console.log('Error al insertar los usuarios '));
		    } else {
		    	console.log('Todos los usuarios se han insertado correctamente.');
		    	resolve();
		    }
		});
	});
}
//Función para Leer un archivo json con fs. Devuelve una promesa con los datos leidos.s
function ReadDB(){
	return new Promise(function(resolve,reject){
		fs.readFile("./salesInit.json",function(err,data){
			if (err){
				console.log("Error al leer el fichero");
				return;
			}
			let info = JSON.parse(data);
			resolve(info);
		});
	});
}
ClearSales()
	.then(ClearUsers)
	.then(ClearSaleWins)
	.then(ReadDB)
	.then(InsertSales)
	.then(InsertUsers)
	.then( function(){
		process.exit(0);
	})
	.catch(function(err){
		console.log("Error: ", err);
		process.exit(1);
	});
