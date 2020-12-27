// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('easyaccomod2' , 'root' , '' ,{
//     host: 'localhost',
//     dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

//         pool: {
//             max: 5,
//             min: 0,
//             idle: 10000
//         },
// } )












const mysql = require('mysql');



module.exports = async (params) => new Promise(
    (resolve, reject) => {
        const connection = mysql.createConnection(params);
      connection.connect(error => {
          if (error) {
          reject(error);
          return;
        }
        resolve(connection);
      })
});


// const connect = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     // database: 'classicmodels',
//     database: 'easyaccomod2',
//     multipleStatements: true
// })

// const connecting = connect.connect(function (err){
//     if (err) throw err.stack
//     else console.log('Connect successfully')
// })

// //const end = connect.end();


// module.exports = {connect, connecting };