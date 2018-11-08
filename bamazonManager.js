const inquirer = require('inquirer');
const mysql = require('mysql');

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
        if (err) throw err;
        console.log('id     product_name     department_name     price     stock_quanity')
        console.log('--     ------------     ---------------     -----     -------------')
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + '     ' + data[i].product_name + '     ' + data[i].department_name + '     ' + data[i].price + '     ' + data[i].stock_quanity)
        }
    });
};

async function displayLow () {
    await connection.query('SELECT * FROM products WHERE stock_quanity <= 5', (err, data) => {
        if (err) throw err;
        console.log('id     product_name     department_name     price     stock_quanity')
        console.log('--     ------------     ---------------     -----     -------------')
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + '     ' + data[i].product_name + '     ' + data[i].department_name + '     ' + data[i].price + '     ' + data[i].stock_quanity)
        }
        managerInquire();
    });
};

const AddToInventory = () =>{ 
displayDB();
inquirer
.prompt({
    type:'input',
    message:'Enter the ID of the product you would like to add',
    name:'ID'
},
{
    type:'input',
    message:'How many would you like to add?',
    name:'amount'
})
.then(answers=>{
    console.log(answers.ID);
    console.log(answers.amount);
})
};

const AddNewProduct = () => {

};

displayDB();
managerInquire();