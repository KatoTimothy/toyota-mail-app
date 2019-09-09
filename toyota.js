//declaring variables to access the different nodejs packages 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express(); //function to create an express application

//convinient variable to refer to the html drectory
var html_dir = './public/';

//morgan variable to give short information of our server activities
app.use(morgan('short'));

//using the body-parser to interprete of form data in the form name attributes
app.use(bodyParser.urlencoded({
    extended: false
}));

//accesses the public folder to be used as static files
app.use(express.static('./public'));


//creating the database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'toyota_db'
});


//route for the index page
app.get("/", function (req, res) {
    res.sendfile(html_dir + "index.html");
});

//the route for accessing the database
app.post("/purchases", (req, res) => {
    const reqBody = req.body;
    //object created to pick the inputs from the form body
    let obj = {
        customer_id: reqBody.customer_id,
        user_name: reqBody.user_name,
        city: reqBody.city,
        part_num: reqBody.part_num,
        unit_price: reqBody.unit_price,
        quantity: reqBody.quantity,
        shipping_method: reqBody.ship_method,
        oversize: reqBody.oversize,
        retail: reqBody.retail,
        total: reqBody.total
    };
    console.log(obj.customer_id, obj.city);
    //assigning variables to get the inputs from to he form
    let city = obj.city,
        unit_price = obj.unit_price,
        quantity = obj.quantity,
        retailer = obj.retail,
        ship_method = obj.shipping_method,
        customerId = obj.customer_id,
        user_name = obj.user_name;

    console.log(customerId, city, unit_price, quantity, retailer, ship_method);

    //query for inserting into the database
    const querystring =
        "INSERT INTO customer_info(customer_id, user_name, city, retail) VALUES(?,?,?,?)";
    //using the sql connection to apply the querystring and pass them to the variables
    connection.query(querystring, [
        customerId,
        user_name,
        city,
        retailer
    ]);

    setTimeout(function () {
        res.redirect('/');
        res.end();
    }, 5000);
});
//notifying the console that the server will listen at port 3000

app.listen(4000);
console.log('Server is listening from port 4000');