var mysql = require("mysql");
var inquirer = require("inquirer");

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
  start();
});


  function postAuction() {
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
        connection.query(
          "INSERT INTO bamazon SET ?",
          {
            
          },
          function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
