var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var sha = require("sha256");

//Devuelve la lista completa de usuarios en la bbdd.
router.get('/', function(req, res) {
	User.list(function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: rows});
		return;
	});
});
//Devuelve un usuario dado su nombre(como parametro name).
router.get('/:name', function(req, res) {
	User.getOneName(req.params.name,function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		res.json({result: true, rows: rows});
		return;
	});
});
//Guarda un usuario en la base de dato. Comprobando que no haya otro ya con ese mismo nombre y lo devuelve.
router.post("/", function(req, res){
	var query = User.find({name: req.body.name});
	query.exec(function(err,rows){
		if(rows.length === 0){
			var user = new User(req.body);
			user.password = sha(user.password); //Hago la hash de la pass.
			user.save(function (err, newRow) {
				if (err){
					res.json({result: false, err: err});
					return;
				}
				res.json({result: true, rows: newRow});
				return;
			});
		}else{
			res.json({result: false, err: "Ya existia un usuario con ese nombre"});
			return;
		}
	});
});
module.exports = router;
