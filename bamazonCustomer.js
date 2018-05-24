

var mysql = require("mysql");
var inquirer = require("inquirer");
require ("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

function getProduct() {
  connection.query("SELECT * FROM products", function(err, res){
    if (err) {
      console.log("err")
    }
    else {
      console.table(res)
      promptUsers(res);
  
    }
  })
};

getProduct();

  function promptUsers(currentInventory) {
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the id of the item you would like to purchase?"
        },
        {
          name: "units",
          type: "input",
          message: "How many units would you like to purchase?"
        },
      ])
      .then(function(answer) {
        console.log("answer", answer)

        for (var i = 0; i< currentInventory.length; i++) {
          if (answer.item = currentInventory[i].item_id) {
            console.log("current Inventory", currentInventory[i].item_id);
            updateProduct(answer.item, answer.units, currentInventory[i].stock_quantity);
          }
          else {
            return;
          }   
          }
        })
      };
    
  
    function updateProduct(item_id, quantityPurchased, currentStock) {
      var updatedStock = currentStock - quantityPurchased;
      console.log("updated Stock", updatedStock);
      connection.query("UPDATE products SET stock_quantity = updatedStock", function(err, res){
        if (err) {
          console.log("err")
        }
        else {
          console.log("thank you for your purchase");
          console.table(res);
        }
      })
    };