const inquirer = require('inquirer');
const mysql = require('mysql');
const Table = require("terminal-table");

const connection = mysql.createConnection({
    host: "localHOST",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

const managerInquire = () => {
 inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'manager'
        })
        .then(answers => {
            switch (answers.manager) {
                case 'View Products for Sale':
                    displayDB();
                    break;
                case 'View Low Inventory':
                    displayLow();
                    break;
                case 'Add to Inventory':
                    AddToInventory();
                    break;
                case 'Add New Product':
                    AddNewProduct();
                    break;
            }
        });
};

const displayDB = () => {
    connection.query('SELECT * FROM products', (err, data) => {
        const t = new Table();
        if (err) throw err;
        t.push(
            ['id', 'product_name', 'department_name', 'price', 'stock_quanity']
        )
        for (var i = 0; i < data.length; i++) {
            t.push(
                [data[i].id , data[i].product_name, data[i].department_name, data[i].price , + data[i].stock_quanity]
            )
        }
        console.log("" + t);
    });
};

async function displayLow () {
    await connection.query('SELECT * FROM products WHERE stock_quanity <= 5', (err, data) => {
        if (err) throw err;
        const t2 = new Table();
        t2.push(
            ['id', 'product_name', 'department_name', 'price', 'stock_quanity']
        )
        for (var i = 0; i < data.length; i++) {
            t2.push(
                [data[i].id , data[i].product_name, data[i].department_name, data[i].price , + data[i].stock_quanity]
            )
        }
        console.log("" + t2);
        managerInquire();
    });
};

function AddToInventory () { 
 displayDB()
    inquirer
.prompt([
    {
    type:'input',
    message:'Enter the ID of the product you would like to add',
    name:'ID'
},
{
    type:'input',
    message:'How many would you like to add?',
    name:'amount'
}
])
.then(answers=>{
    var amount = answers.amount
    var id = answers.ID
    query = 'UPDATE products SET stock_quanity = stock_quanity + ? WHERE id = ?'
    connection.query(query,[amount,id], (err,data) => {
        if (err){console.log(err)}
        displayDB();
        managerInquire();
    } )
});


};

const AddNewProduct = () =>{ 
        inquirer
    .prompt([
        {
        type:'input',
        message:'Enter the name of the product you would like to add',
        name:'name'
    },
    {
        type:'input',
        message:'What department does this item belong in?',
        name:'department'
    },
    {
        type:'input',
        message:'Enter the price of the item',
        name:'price'
    },
    {
        type:'input',
        message:'How many would you like to add?',
        name:'amount'
    }
    ])
    .then(answers=>{
        var name = answers.name
        var department = answers.department
        var price = answers.price
        var amount = answers.amount
        query = 'INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES (?,?,?,?)'
        connection.query(query, [name,department,price,amount],(err,data) => {
            if (err){console.log(err)}
            displayDB();
            managerInquire();
        } )
    })
    };

managerInquire();