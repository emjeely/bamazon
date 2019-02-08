require("dotenv").config();

const mysql = require('mysql');
const inquirer = require('inquirer');


let id;
let units;
let totalPrice;
let queryPrice;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
    database: "bamazon"
  });

  connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId);
    getProducts();
  });

  function getProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // console.log(res);

      console.log("\nWelcome to Bamazon!" + "\n+---------------------------------------------------+\n")

      for (let i = 0; i < res.length; i++){
        console.log("ID: " + res[i].item_id, " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Stock Quantity: " + res[i].stock_quantity + " | Price: " + res[i].price + "\n")
      }
      userPrompt();
    });
  }


function userPrompt() {
  inquirer
  .prompt([
    {
      name: "id",
      message: "Select Product ID you wish to purchase: "
    },
    {
      name: "units",
      message: "How many would you like?"
    }
  ]).then((answer) => {
    id = parseInt(answer.id);
    units = parseInt(answer.units);
    // console.log("ID: " + id + "\nUnits: " + units);
    qtyCheck(id, units);
  })
}


function qtyCheck(id, units) {
  
  connection.query("SELECT * FROM products WHERE item_id = " + id, function(err, res) {
    let queryQTY;

    if (err) throw err;
    // console.log(res[0].stock_quantity);

    queryQTY = parseInt(res[0].stock_quantity);
    // console.log("Inside sql query: " + queryQTY);
    console.log("CHECKING QUANTITIES NOW...")
    if(queryQTY - units <= 0) {
      console.log("Insufficient Quantity!")
      userPrompt();
     } 
     else{
      updateData(id, queryQTY, units) 
     }
  });  
}

function updateData(id, queryQTY, units){
  let remainingStock = queryQTY - units 
  
  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity:remainingStock
    },
    {
      item_id:id 
    }
  ],
  function(err,res){
    console.log("Product Purchased!! CONGRATS!!");
  });
  connection.end();
};

