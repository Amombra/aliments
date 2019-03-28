var express = require('express');
var router = express.Router();
//var rapide = express.rapide();
var connection  = require('../config/database');


 
 
/* GET home page. */
router.get('/', function(req, res, next) {
      
 connection.query('SELECT * FROM customers ORDER BY id desc',function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
         res.render('customers',{page_title:"Customers - Node.js",data:''});   
        }else{
            
            res.render('customers',{page_title:"Customers - Node.js",data:rows});
        }
                            
         });
        
    });
 
 
// SHOW ADD USER FORM
router.get('/add', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('customers/add', {
        title: 'Add New Customers',
        name: '',
        email: '',
        number:'',
        selection:'',
        localisation:'',
        nom_produit:''       
    })
})
 
// ADD NEW USER POST ACTION
router.post('/add', function(req, res, next){    
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    req.assert('number', 'A valid number is required').notEmpty()  //Validate email
    req.assert('selection', 'A valid selection is required').notEmpty()  //Validate email
    req.assert('localisation', 'A valid localisation is required').notEmpty()  //Validate email
    req.assert('nom_produit', 'A valid product name is required').notEmpty()  //Validate email
  
    var errors = req.validationErrors()
     
    if( !errors ) {   //No errors were found.  Passed Validation!
         
     
        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            number: req.sanitize('number').escape().trim(),
            selection: req.sanitize('selection').escape().trim(),
            localisation: req.sanitize('localisation').escape().trim(),
            nom_produit: req.sanitize('nom_produit').escape().trim()
        }
         
     connection.query('INSERT INTO customers SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                     
                    // render to views/user/add.ejs
                    res.render('customers/add', {
                        title: 'Add New Customer',
                        name: user.name,
                        email: user.email,                   
                        number: user.number,                    
                        selection: user.selection,                    
                        localisation: user.localisation,                    
                        nom_produit: user.nom_produit                    
                    })
                } else {                
                    req.flash('success', 'Données ajoutées avec succès!');
                    res.redirect('/customers');
                }
            })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
         
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('customers/add', { 
            title: 'Add New Customer',
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            selection: req.body.selection,
            localisation: req.body.localisation,
            nom_produit: req.body.nom_produit
        })
    }
})
 
// SHOW EDIT USER FORM
router.get('/edit/(:id)', function(req, res, next){
   
connection.query('SELECT * FROM customers WHERE id = ' + req.params.id, function(err, rows, fields) {
            if(err) throw err
             
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Customers not found with id = ' + req.params.id)
                res.redirect('/customers')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('customers/edit', {
                    title: 'Edit Customer', 
                    //data: rows[0],
                    id: rows[0].id,
                    name: rows[0].name,
                    email: rows[0].email,                    
                    number: rows[0].number,                    
                    selection: rows[0].selection,                    
                    localisation: rows[0].localisation,                    
                    nom_produit: rows[0].nom_produit                    
                })
            }            
        })
  
})
 
// EDIT USER POST ACTION
router.post('/update/:id', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty() ,          //Validate nam           //Validate age
    req.assert('email', 'A valid email is required').isEmail() , //Validate email
    req.assert('number', 'A valid number is required').notEmpty(),  //Validate email
    req.assert('selection', 'A valid selection is required').notEmpty(),  //Validate email
    req.assert('localisation', 'A valid localisation is required').notEmpty(),  //Validate email
    req.assert('nom_produit', 'A valid nom_produit is required').notEmpty()  //Validate email
  
    var errors = req.validationErrors()
     
    if( !errors ) {   
 
        var user = {
            name: req.sanitize('name').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            number: req.sanitize('number').escape().trim(),
            selection: req.sanitize('selection').escape().trim(),
            localisation: req.sanitize('localisation').escape().trim(),
            nom_produit: req.sanitize('nom_produit').escape().trim()
        }
         
connection.query('UPDATE customers SET ? WHERE id = ' + req.params.id, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                     
                    // render to views/user/add.ejs
                    res.render('customers/edit', {
                        title: 'Edit Customer',
                        id: req.params.id,
                        name: req.body.name,
                        email: req.body.email,
                        number: req.body.number,
                        selection: req.body.selection,
                        localisation: req.body.localisation,
                        nom_produit: req.body.nom_produit,
                    })
                } else {
                    req.flash('success', 'Mise à jour réussie !!!');
                    res.redirect('/customers');
                }
            })
         
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
         
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('customers/edit', { 
            title: 'Edit Customer',            
            id: req.params.id, 
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            selection: req.body.selection,
            localisation: req.body.localisation,
            nom_produit: req.body.nom_produit
        })
    }
})
       
// DELETE USER
router.get('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
     
connection.query('DELETE FROM customers WHERE id = ' + req.params.id, user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to users list page
                res.redirect('/customers')
            } else {
                req.flash('success', 'Customer deleted successfully! id = ' + req.params.id)
                // redirect to users list page
                res.redirect('/customers')
            }
        })
   })
 
 
module.exports = router;