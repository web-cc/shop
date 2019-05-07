var mysql=require ('mysql');

var connection = mysql.createConnection ({ 
    host : 'db4free.net',
    user : 'phongnhanadmin',
    password : '8b175e7a',
    database : 'shopadmin00'});
    connection.connect();
module.exports = connection;