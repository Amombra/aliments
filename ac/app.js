var express = require('express');
const http = require('http');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var createError = require('http-errors');

var path = require('path');
var expressValidator = require('express-validator');
var mysql = require('mysql');

var customersRouter = require('./routes/customers');
var app = express();
var port = process.env.PORT || 8000;
var passport = require('passport');
var flash = require('connect-flash');
var connection  = require('./config/database');



//const customerController = require('./config/crud.js');



require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('views'));


app.set('view engine', 'ejs');

app.use(session({
	secret: 'justasecret',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressValidator());


app.use('/customers', customersRouter);

app.get('/', function(req, res)
{
   res.render('index');
})

app.get('/list_produits', function(req, res)
{
   res.render('list_produits');
})

app.get('/ajout_produits', function(req, res)
{
   res.render('ajout_produits');
})

app.get('/list_produits', function(req, res)
{
   res.render('list_produits');
})

app.get('/customers_edit', function(req, res)
{
   res.render('customers_edit');
})



app.get('/logout', function(req, res)
{
   res.render('logout');
})

app.get('/produit', function(req, res)
{
   res.render('produit');
})

app.get('/profile', function(req, res)
{
   res.render('profile');
})

app.get('/retourclient', function(req, res)
{
   res.render('retourclient');
})


 app.get('/edit', function(req, res)
{
   res.render('edit');
})

 app.get('/index2', function(req, res)
{
   res.render('index2');
})

app.get('/add', function(req, res)
{
   res.render('add');
})


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
 });

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
res.redirect('/');

}
var router = express.Router();

  app.post('/index2', function(req, res){
     infos = req.body
     let valeur = [req.body.categorie_produit, req.body.nom_produit, req.body.prix, req.body.localite_prod, req.body.email_marchand]
     connection.query('INSERT INTO customers (categorie_produit, nom_produit, prix, localite_prod, email_marchand) VALUES (?, ?, ?, ?, ?)', valeur, (err,results) =>{
     console.log(req.body);
     if(!err)
     res.render('succes', {infos});
    else 
     console.log(err.message);
     })
});

app.post('/list_produits', function(req, res){
    newsnan =req.body

    let admin = [req.body.categorie_produit_acc, req.body.nom_produit_acc, req.body.prix_acc, req.body.localite_prod_acc, req.body.email_marchand_acc]
    connection.query('INSERT INTO valide (categorie_produit_acc, nom_produit_acc, prix_acc,localite_prod_acc, email_marchand_acc) VALUES (?, ?, ?, ?, ?)', admin, (err, results) =>{
        console.log(req.body);
        if(!err)
        res.render('list_produits', {newsnan});
        else
        console.log(err.message);
    })
});

app.listen(port)
console.log("Port :" + port);