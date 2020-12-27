//const conn = require('../config/db')
const connection = require('../config/db/index');
const query = require('../config/db/query');

async function customerCreat(cus , res)
{

    
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        // database: 'classicmodels',
        database: 'easyaccomod2',
        //multipleStatements: true
    }
    const conn = await connection(dbConfig).catch(e => {})

    var sql = "SELECT COUNT(*) AS total FROM customer";
    var resualts = await query(conn, sql).catch(console.log)
    console.log(resualts);
    resualts = await query(conn , "SELECT *  FROM customer").catch(console.log);
    console.log(resualts);
    //const resualts  = await query(connection)
    // conn = require('../config/db')
    // conn.connecting;
    // let checkEmailSql = "SELECT * FROM customer "
    // //let sql = "SELECT * FROM film LIMIT 10;"
    // //conn.connect.query("SELECT * FROM film LIMIT 10;" , function(err, resualts){console.log(resualts)})
    // // let dulicateEmail;
    // // let dulicatePhone;
    // //console.log(cus.email)
    // var db = conn.connect.query( "SELECT COUNT(*) AS total FROM customer" , function (err, resualts){
    //     console.log(resualts[0]);
    //     db = resualts[0]
    // })

    // db.
    // let a = '{"total":1}'
    // db = JSON.parse(a);
    
    // conn.connect.query(checkEmailSql,  function (error , resualt){
    // if (error) throw error.stack;
    // else {
    //          console.log(resualt)
         
    //      }
    //  } )
    // conn.connect.query(checkEmailSql, [cus.phone], function (error , resualt){
    //     if (error) throw error.stack;
    //     else {
    //     if (resualt == 0 ) dulicatePhone = false;
    //     else dulicatePhone = true;
    //     }
    // } )
    // console.log(dulicatePhone);

    // let sql = "INSERT INTO customer (fullName , phone , email , password) VALUES ('" + cus.fullname + "','" + cus.phone + "','" + cus.email + "','" + cus.password + "')" ;
    // console.log(sql)
    // conn.connect.query(sql , () => {})
    //conn.end;
    conn.connect.end();
}

module.exports = {customerCreat};