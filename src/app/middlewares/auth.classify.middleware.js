const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');

module.exports.checkDuplicate = async function(req , res , next)
{
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT COUNT(*) total FROM classify WHERE phone_number = ?"
    var resualts =  await query(conn, sql, [req.body.phone]).catch(console.log);
    if (resualts[0].total != 0){
        //res.render('login/login',
        res.send( 
        {
        err : 'Tài khoản đã tồn tại'
        });
        conn.end();
        return;
    }
    conn.end();
    next();

}