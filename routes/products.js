var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require("../models/product");
var passport = require('passport');

//GET listin.
router.get('/', isLoggedIn, function(req, res) {
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

router.get('/add', isLoggedIn, function(req, res, next) {
    res.render('product/add', {
        title: 'Add a New Product'
    });
});

// POST handler for add to process the form
router.post('/add', isLoggedIn, function(req, res, next) {

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
router.get('/:id', isLoggedIn, function(req, res, next) {
   // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected product
    Product.findById(id, function(err, product) {
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
router.post('/:id', isLoggedIn, function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the product object
    var product = new Product( {
        _id: id,
        name: req.body.name,
        Type: req.body.Type,
        color: req.body.color
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

// GET handler for delete using the product id parameter
router.get('/delete/:id', isLoggedIn, function(req, res, next) {
   // grab the id parameter from the url
    var id = req.params.id;

    console.log('trying to delete');

    Product.remove({ _id: id }, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show updated product list
            res.redirect('/product');
        }
    });
});



// auth check
function isLoggedIn(req, res, next) {

    // is the user authenticated?
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}


module.exports = router;