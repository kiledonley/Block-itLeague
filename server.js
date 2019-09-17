var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
require('dotenv').config()

// Create connection to database
var config =
{
    authentication: {
        options: {
            userName: process.env.DB_username, // update me
            password: process.env.DB_password // update me
        },
        type: 'default'
    },
    server: process.env.DB_server, // update me
    options:
    {
        database: process.env.DB_database, //update me
        encrypt: true
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
            queryDatabase()
        }
    }
);

function queryDatabase()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc "
            + "JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}