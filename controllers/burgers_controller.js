/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.Burger.findAll({

	})
	.then(function (burgers) {
		res.render('index', {
			burgers: burgers
		});
	});
});

router.post('/burgers/create', function (req, res) {
	models.Burger.create({
		burger_name: req.body.burger_name, 
		devoured: req.body.devoured
	})
	.then(function() {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {

	models.Burger.update({
		devoured: req.body.devoured
	},
	{
		where: { 
			id: req.params.id
		}
	})
	.then(function(result) {
		res.redirect('/burgers');
	});
});

module.exports = router;
