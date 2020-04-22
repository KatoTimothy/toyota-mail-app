const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const morgan = require('morgan')

const app = express();

var public = './public/';

//middleware to show brief server information
app.use(morgan('short'));

//middleware to parse data 
app.use(bodyParser.urlencoded({
	extended: false
}));

//serve the static files in the public folder
app.use(express.static(public));

//database configurations
const db = mysql.createConnection({
	host: 'localhost',
	user: 'kato_tim',
	password: 'timuci-1994',
	database: 'toyota_db'
});

//home route serve the index page
app.get("/", function (req, res) {
	res.sendfile(html_dir + "index.html");
});

//for post request to '/purchases/, process the data 
app.post("/orders", (req, res) => {

	//obtain posted values from the request body
	let {
		customer_id, customer_name, customer_town, item_code, item_price, quantity, shipping_method, item_name, container_oversize
	} = req.body

	//Just a little console log for debugging
	console.log(customer_id, customer_town, item_price, quantity, customer_type, shipping_method, container_oversize);

	//sql query
	const sql =
		"INSERT INTO customer_info(id, customer_name, customer_town, customer_type, item_code, item_name, quantity, container_oversize, shipping_method) VALUES(?,?,?,?,?,?,?,?,?)";

	//query the database with posted values
	db.query(sql, [customer_id, customer_name, customer_town, customer_type, item_code, item_name, quantity, container_oversize, shipping_method
	]);
	//redirect to index page after 10 seconds
	setTimeout(function () {
		res.redirect('/');
		res.end();
	}, 10000);
});

//server listening on port 4000
app.listen(4000);

//just for debugging 
console.log('Server is listening from port 4000');