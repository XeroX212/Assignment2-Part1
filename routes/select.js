var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("../models/product");

//GET listin.
router.get('/', function(req, res) {
   // Retrieve all product
	Product.find(function (err, products) {
		// if get an error
		if (err) {
			console.log(err);
			res.end(err);
		}
		else {
			// show the view and pass data into it (if we get data)
			res.render('select', {
				title: 'select',
                products: products
			});
		}
	});
});

module.exports = router;