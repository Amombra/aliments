
const controller = {};

controller.list = (req, res) => {
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM customer', (err, customers) => {
			if(err){
				res.json(err);
			}
			res.render('customers', {
				data: customers
			});
		});
	});
};

controller.save = (req, res) => {
	const data = req.body;
	req.getConnection((err, conn) => {
		conn.query('INSERT INTO customer set ?',[data], (err, customer) =>{
			res.redirect('/list_produits');
		});
	})
};

controller.edit = (req, res) => {
	const { id } = req.params;
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) =>{
			console.log(customer);
			res.render('customers_edit',{
				data:customer[0]
			});
		});
	});
};

controller.update = (req, res) => {
	const { id } = req.params;
	const newCustomer = req.body;
	req.getConnection((err, conn) =>{
		conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) =>{
			res.redirect('/list_produits');
		});
	});
};


controller.delete = (req, res) =>{
	const { id } = req.params;
	req.getConnection((err, conn) =>{
		conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
			res.redirect('/list_produits');
		});

	});

};

module.exports = controller;