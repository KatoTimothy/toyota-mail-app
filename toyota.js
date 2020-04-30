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
//handle all requests for /orders
app.route('/orders')
  .get((req, res) => {
    try {
      res.status(404)
        .send(`<h2 style="color:red">Bad request</h2>`)
    } catch{

    }
  })
  .post((req, res) => {

    //obtain posted values from the request body
    const form_data = { ...req.body }
    console.log(form_data.customer_id)

    //sql query
    let sql = `INSERT INTO orders SET ? `

    //Insert into database
    db.query(sql, form_data, (errors, results, fields) => {

      if (errors) {
        throw errors;
      }
      console.log(results.insertId)
    })
    let msg = `<h2 style="color:green">Form submitted successfully</h2>`
    res.send(msg)

  })

//server listening on port 3000
app.listen(3000)

//just for debugging
console.log("Server is listening from port 3000")
