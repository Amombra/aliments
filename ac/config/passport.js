var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');

module.exports = function(passport) {
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});


	passport.deserializeUser(function(id, done){
		dbconfig.query("SELECT * FROM users WHERE id = ?", [id],
			function(err, rows){
			 done(err, rows[0]);
		});
	});

	passport.use(
		'local-signup',
		new LocalStrategy({
			usernameField : 'username',
			passwordField: 'password',
			passReqToCallback: true
		},
		 function(req, username, password, done) {
			dbconfig.query("SELECT * FROM users WHERE username = ?",
		 		[username], function(err, rows){
		 			if(err)
		 				return done(err);
		 			if(rows.length){
		 				return done(null, false, req.flash('signupMessage', 'Cela a déja été pris'));
		 			} else {
		 				var newUserMysql = {
		 					username: username,
		 					password: bcrypt.hashSync(password, null, null)
		 				};

		 				var insertQuery = "INSERT INTO users (username, password) values (?, ?)";

		 				dbconfig.query(insertQuery, [newUserMysql.username, newUserMysql.password],
		 					function(err, rows){
		 						newUserMysql.id = rows.insertId;

		 						return done(null, newUserMysql);
		 					});
		 				}
		 			});
		 		})
		);

	passport.use(
		'local-login',
		new LocalStrategy({
			usernameField : 'username',
			passwordField : 'password',
			passReqToCallback: true
		},
		function(req, username, password, done){
			dbconfig.query("SELECT * FROM users WHERE username = ? ", [username],
				function(err, rows){
					if(err)
						return done(err);
					if(!rows.length){
						return done(null, false, req.flash('loginMessage', 'Aucun utilisateur trouvé !'));		
					}
					if(!bcrypt.compareSync(password, rows[0].password))
						return done(null, false, req.flash('loginMessage', 'Mot de pass incorrect ! Veuillez recommencer...'));
					return done(null, rows[0]);
				});
			})
		);
	};



