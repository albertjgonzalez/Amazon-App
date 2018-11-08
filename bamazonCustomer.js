const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localHOST",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

const customerInquire = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: 'Enter the ID of the product you would like to buy.',
            name: 'productID'
        },
        {
            type: 'input',
            message: 'How many units of the product would you like to buy?',
            name: 'quanity'
        }])
        .then(answer => {
            var productID = answer.productID;
            var quanity = answer.quanity;
            updateDatabase(productID, quanity);
        })

}

const updateDatabase = (productID, quanity) => {
    var currentquanity;
    var query = 'SELECT * FROM products WHERE id = ?'
    connection.query(query, (productID), (err, data) => {
        if (err) throw err;
        currentquanity = data[0].stock_quanity
        if ((data[0].stock_quanity - quanity) >= 0) {
            currentquanity = currentquanity - quanity;
        }
        else {
            console.log("Insufficient quantity!")
        }

        query = 'UPDATE products SET stock_quanity = ? WHERE id = ?'
        connection.query(query, [currentquanity, productID], (err, data) => {
            if (err) throw err;
            displayDB();
        })
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
        customerInquire();
    });
}

displayDB();