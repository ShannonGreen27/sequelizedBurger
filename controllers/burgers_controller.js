/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	models.Burger.findAll({
		include: [models.User]
	})
	.then(function (burgers) {
		res.render('index', {
			burgers: burgers
		});
	});
});

router.post('/create', function (req, res) {
	models.Burger.create({
		burger_name: req.body.burger_name, 
		devoured: req.body.devoured
	})
	.then(function() {
		res.redirect('/burgers');
	});
});

router.put('/update/:id', function (req, res) {
	models.User.create({
		name: req.body.name
	})
	.then(function(createResult) {
		models.User.findAll({
			where: {
				name: req.body.name
			}
		})
		.then(function(nameResult) {
			models.Burger.update({
			devoured: req.body.devoured,
			user_id: nameResult[nameResult.length - 1].id
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
	});
});

module.exports = router;
