var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("../models/product")

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
			res.render('product/index', {
				title: 'Product',
                products: products
			});
		}
	});
});

router.get('/add', function(req, res, next) {
    res.render('product/add', {
        title: 'Add a New Product'
    });
});

// POST handler for add to process the form
router.post('/add', function(req, res, next) {

    // save a new product using our product model and mongoose
    Product.create( {
            name: req.body.name,
            Type: req.body.Type,
            color: req.body.color
        }
    );

    // redirect to main Product page
    res.redirect('/product');
});

// GET handler for edit to show the populated form
router.get('/:id', function(req, res, next) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected product
    Product.findById(id,  function(err, product) {
       if (err) {
           console.log(err);
           res.end(err);
       }
        else {
           // show the edit view
           res.render('product/edit', {
               title: 'product Details',
               product: product
           });
       }
    });
});

// post handler for edit to update the product
router.post('/:id', function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the product object
    var product = new Product( {
        _id: id,
        name: req.body.name,
        Type: req.body.title,
        color: req.body.content
    });

    // use mongoose and our product model to update
    Product.update( { _id: id }, product,  function(err) {
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/product');
        }
    });
});



module.exports = router;