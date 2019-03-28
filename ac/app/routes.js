module.exports = function(app, passport) {
	app.get('/', function(req, res){
		res.render('index.ejs');
	});


app.get('/login', function(req, res){
	res.render('login.ejs', {message:req.flash('loginMessage')});
});

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}),
 function(req, res){
 	if(req.body.remember){
 		req.session.cookie.maxAge = 1000 * 60 * 3;
 	} else {
 		req.session.cookie.expires = false;
 	}
 	res.redirect('/');
  });
 app.get('/signup', function(req, res){
 	res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
 	successRedirect: '/profile',
 	failureRedirect:'/signup',
 	failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
 	res.render('profile.ejs', {
 		user:req.user
 	});
 });

 app.get('/logout', function(req, res){
 	req.logout();
 	res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
res.redirect('/');
}






const express = require('express');
const router = express.Router();


const customerController = require('../config/crud');

router.get('/list_produits', customerController.list);

router.post('/add', customerController.save);
router.get('/delete/:id', customerController.delete);

router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);

module.exports = router;