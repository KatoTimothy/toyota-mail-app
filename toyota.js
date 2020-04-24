const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const morgan = require("morgan")

const app = express()

var public = "./public/"

//middleware to show brief server information
app.use(morgan("short"))

//middleware to parse data
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

//serve the static files in the public folder
app.use(express.static(public))

//database configurations
const db = mysql.createConnection({
  host: "localhost",
  user: "kato_tim",
  password: "timuci-1994",
  database: "toyota_db",
})

//home route serve the index page
app.get("/", function (req, res) {
  try {
    res.sendfile(public + "index.html")
  } catch{
    res.set({ 'Content-Type': 'text/html' }).send(`<h2 style="color:red">Bad request</h2>`).end()
  }
})

app.get("/orders", function (req, res) {
  try {
    res.status(404).set({ 'Content-Type': 'text/html' }).send(`<h2 style="color:red">Bad request</h2>`).end()
  } catch{

  }
})

//for post request to '/orders/, process the data
app.post("/orders", (req, res) => {
  //obtain posted values from the request body
  let {
    customer_id,
    customer_name,
    customer_type,
    customer_town,
    item_code,
    item_name,
    quantity,
    shipping_method,
    container_oversize,
  } = req.body
  //Just a little console log for debugging
  console.log(
    customer_id,
    customer_town,
    quantity,
    customer_type,
    shipping_method,
    container_oversize,
  )

  //sql query
  let sql = `INSERT INTO orders (customer_id, customer_name, customer_town, customer_type, item_code, item_name, quantity, container_oversize, shipping_method) `
  sql += `VALUES(?,?,?,?,?,?,?,?,?)`

  //query the database with posted values
  db.query(sql, [
    customer_id,
    customer_name,
    customer_town,
    customer_type,
    item_code,
    item_name,
    quantity,
    container_oversize,
    shipping_method,
  ])

  //send a success page 
  try {
    let msg = `<h2 style="color:green">Form submitted successfully</h2>`
    //set header
    res.set({
      "Content-Type": "text/html"
    }).send(msg).end()
  } catch{
    let error_msg = `<h2 Oops!</h2`
    res.set({ 'Content-Type': 'text/html' }).status(400).send(error_msg).end()
  }
})

//server listening on port 3000
app.listen(3000)

//just for debugging
console.log("Server is listening from port 3000")
